import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseCode = searchParams.get('courseCode'); // Get the course code from the request

  if (!courseCode) {
    return new Response(JSON.stringify({ error: 'Missing courseCode' }), { status: 400 });
  }

  try {
    // Query to get unlocked subtasks (is_locked = 0) for the given courseCode
    const [rows] = await pool.query(`
      SELECT 
        subtask.coursework_id,
        subtask.subtask,
        subtask.title,
        subtask.description,
        subtask.start_date,
        subtask.end_date,
        subtask.is_locked,
        subtask.weight,
        subtask.task_type,
        subtask.file_attachment
      FROM 
        subtask
      JOIN coursework ON subtask.coursework_id = coursework.coursework_id
      WHERE 
        coursework.course_code = ? 
        AND subtask.is_locked = 0
    `, [courseCode]);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch unlocked subtasks' }), { status: 500 });
  }
}
