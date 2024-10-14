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

    // Check if we are correctly fetching subtasks
    console.log("Fetched Subtasks: ", subtasks);

    // Fetch submissions for the student
    const [submissions] = await pool.query(`
      SELECT subtask, coursework_id 
      FROM submission 
      WHERE student_username = ?
    `, [username]);

    // Create a Set for submission (use both subtask and coursework_id as keys)
    const submittedSubtaskIds = new Set(submissions.map(submission => `${submission.subtask}-${submission.coursework_id}`));

    // Check if we are correctly fetching submissions
    console.log("Fetched Submissions: ", submissions);

    // Filter out the submitted subtasks by using subtask and coursework_id together
    const upcomingSubtasks = subtasks.filter(subtask => !submittedSubtaskIds.has(`${subtask.subtask}-${subtask.coursework_id}`));

    // Check if filtering logic works
    console.log("Upcoming Subtasks after filter: ", upcomingSubtasks);

    if (upcomingSubtasks.length === 0) {
      console.log("No upcoming deadlines found");
    }

    return new Response(JSON.stringify(upcomingSubtasks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
