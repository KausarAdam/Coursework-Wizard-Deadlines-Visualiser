import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username'); // Get the username from the request

  try {
    const [rows] = await pool.query(`
      SELECT 
        student.first_name,
        student.last_name,
        student.email,
        student.phone,
        student.description,
        student.preferred_name,
        student.picture,
        student.linkedin,
        student.instagram,
        student.github
      FROM 
        student
      WHERE 
        student.username = ?
    `, [username]);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch username' }), { status: 500 });
  }
}
