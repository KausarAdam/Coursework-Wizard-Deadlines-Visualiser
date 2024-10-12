import pool from "../../../lib/db";

const borderColors = {
  // Map course codes to border colors
  'course_code_1': '#BEDFE4',
  'course_code_2': '#D8BFEA',
  'course_code_3': '#E8EDC1',
  'course_code_4': '#ECC2D1',
};

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
    // Fetch course codes for the student
    const [enrolledCourses] = await pool.query(
      `SELECT course_code FROM enrolment WHERE student_username = ?`, 
      [username]
    );

    const courseCodes = enrolledCourses.map(row => row.course_code);

    if (courseCodes.length === 0) {
      return new Response(JSON.stringify({ message: "No courses found for this student" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Prepare the SQL query with placeholders
    const placeholders = courseCodes.map(() => '?').join(',');
    const query = `
      SELECT cw.title, cw.end_date AS due_date, c.course_code, c.name AS course_name
      FROM coursework cw
      JOIN course c ON cw.course_code = c.course_code
      WHERE cw.course_code IN (${placeholders}) AND cw.coursework_sequence = 1
    `;

    // Fetch coursework details
    const [courseworkDetails] = await pool.query(query, courseCodes);

    // Attach the corresponding border color
    const courseworkWithColors = courseworkDetails.map(coursework => ({
      ...coursework,
      borderColor: borderColors[coursework.course_code] || '#000000', // Default color if course code not found
    }));

    return new Response(JSON.stringify(courseworkWithColors), {
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
