import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const courseCode = searchParams.get('courseCode'); // Get the course code from the request
  const studentUsername = searchParams.get('studentUsername'); // Get the student username from the request

  if (!courseCode || !studentUsername) {
    return new Response(JSON.stringify({ error: 'Missing courseCode or studentUsername' }), { status: 400 });
  }

  try {
    // Query to get submission data for the given courseCode and studentUsername
    const [rows] = await pool.query(`
      SELECT 
        submission.submission_id,
        submission.coursework_id,
        submission.subtask,
        submission.status,
        submission.submission_date,
        submission.student_username,
        submission.file_attachment
      FROM 
        submission
      JOIN coursework ON submission.coursework_id = coursework.coursework_id
      WHERE 
        coursework.course_code = ? AND submission.student_username = ?
    `, [courseCode, studentUsername]);
    
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return new Response(JSON.stringify({ error: 'Failed to fetch submissions' }), { status: 500 });
  }
}
