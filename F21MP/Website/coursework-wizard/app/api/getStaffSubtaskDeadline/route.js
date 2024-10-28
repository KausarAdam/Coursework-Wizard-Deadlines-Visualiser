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
    // First, get courses taught by the staff member
    const [courses] = await pool.query(
      `
      SELECT course_code 
      FROM course 
      WHERE staff_username = ?
      `,
      [username]
    );

    if (courses.length === 0) {
      return new Response(JSON.stringify({ message: 'No courses found for this staff member' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract course codes
    const courseCodes = courses.map(course => course.course_code);

    // Fetch subtasks for these courses and get the nearest deadline
    const [subtasks] = await pool.query(
      `
      SELECT subtask, title, end_date, course_code
      FROM subtask
      WHERE course_code IN (?) AND end_date > NOW()
      ORDER BY end_date ASC
      LIMIT 1
      `,
      [courseCodes]
    );

    if (subtasks.length > 0) {
      const nextDeadline = subtasks[0];
      return new Response(JSON.stringify(nextDeadline), {
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
