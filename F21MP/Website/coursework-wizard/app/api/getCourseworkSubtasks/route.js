import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const course_code = searchParams.get("course_code");
  const coursework_id = searchParams.get("coursework_id");

  if (!course_code || !coursework_id) {
    return new Response(JSON.stringify({ error: 'Missing course_code or coursework_id' }), { status: 400 });
  }

  try {
    const [rows] = await pool.query(`
      SELECT 
        subtask.subtask,
        subtask.course_code,
        subtask.coursework_id,
        subtask.title,
        subtask.description,
        subtask.start_date,
        subtask.end_date,
        subtask.task_type,
        subtask.file_attachment
      FROM 
        subtask
      WHERE
        subtask.course_code = ? AND subtask.coursework_id = ?
    `, [course_code, coursework_id]);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch subtasks' }), { status: 500 });
  }
}
