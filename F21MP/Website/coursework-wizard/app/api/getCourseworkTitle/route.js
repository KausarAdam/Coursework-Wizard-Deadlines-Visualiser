import pool from "@/lib/db";

export async function GET(request) {
  const url = new URL(request.url); 
  const coursework_id = url.searchParams.get("coursework_id");

  try {
    const [rows] = await pool.query(
      'SELECT coursework.coursework_id, coursework.course_code, coursework.title, coursework.description, coursework.start_date, coursework.end_date, coursework.coursework_sequence FROM coursework WHERE coursework_id = ?',
      [coursework_id]
    );
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch coursework details' }), { status: 500 });
  }
}
