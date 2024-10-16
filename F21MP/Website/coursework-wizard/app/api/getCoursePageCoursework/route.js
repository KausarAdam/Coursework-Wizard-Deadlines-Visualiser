import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseCode = searchParams.get('courseCode'); // Get the course code from the request

  try {
    const [rows] = await pool.query(`
      SELECT 
        coursework.course_code,
        coursework.coursework_id,
        coursework.title,
        coursework.description,
        coursework.start_date,
        coursework.end_date,
        coursework.coursework_sequence
      FROM 
        coursework
      WHERE 
        coursework.course_code = ?
    `, [courseCode]);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch coursework' }), { status: 500 });
  }
}
