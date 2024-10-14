import pool from "@/lib/db";

export async function GET(request) {
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
        subtask.file_attachment,
        course.name AS course_name  -- Fetch the course name from the course table
      FROM 
        subtask
      LEFT JOIN  -- Use LEFT JOIN to include all subtasks even if the course doesn't exist
        course ON subtask.course_code = course.course_code
    `);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch subtasks' }), { status: 500 });
  }
}
