import pool from '../../../lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return new Response(JSON.stringify({ message: 'Username is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Fetch subtasks for the student
    const [subtasks] = await pool.query(`
      SELECT s.subtask, s.end_date, s.course_code, s.coursework_id
      FROM subtask s
      JOIN coursework cw ON s.coursework_id = cw.coursework_id
      JOIN enrolment e ON cw.course_code = e.course_code
      WHERE e.student_username = ?
    `, [username]);

    // Fetch submissions and their statuses for the student
    const [submissions] = await pool.query(`
      SELECT subtask, coursework_id, status 
      FROM submission 
      WHERE student_username = ?
    `, [username]);

    // Create a Set for tasks that are completed/submitted
    const validSubtasks = subtasks.filter(subtask => {
      // Find the corresponding submission
      const submission = submissions.find(sub => 
        sub.subtask === subtask.subtask && sub.coursework_id === subtask.coursework_id
      );
      
      // If the submission exists, check the status
      return submission && 
             (submission.status === 'to-do' || submission.status === 'in progress') && 
             subtask.end_date; // Ensure valid deadlines
    });

    // Sort to get the nearest deadline
    const nextDeadline = validSubtasks.sort((a, b) => new Date(a.end_date) - new Date(b.end_date))[0];

    if (nextDeadline) {
      return new Response(JSON.stringify([nextDeadline]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'No upcoming deadlines found' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
