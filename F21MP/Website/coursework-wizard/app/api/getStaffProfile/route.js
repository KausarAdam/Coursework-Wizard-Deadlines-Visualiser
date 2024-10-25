import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username'); // Get the username from the request

  try {
    const [rows] = await pool.query(`
      SELECT 
        staff.first_name,
        staff.last_name,
        staff.email,
        staff.phone,
        staff.description,
        staff.preferred_name,
        staff.picture,
        staff.linkedin,
        staff.instagram,
        staff.github
      FROM 
        staff
      WHERE 
        staff.username = ?
    `, [username]);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch username' }), { status: 500 });
  }
}
