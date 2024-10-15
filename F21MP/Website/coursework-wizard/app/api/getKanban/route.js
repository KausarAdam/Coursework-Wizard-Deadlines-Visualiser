import { NextResponse } from "next/server"; // Import NextResponse
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username"); // Get the username from query params

    // SQL query to fetch unlocked subtasks and relevant submissions
    const [rows] = await pool.query(`
      SELECT 
        subtask.subtask,
        subtask.course_code,
        subtask.coursework_id,
        subtask.title,
        subtask.start_date,
        subtask.end_date,
        subtask.is_locked,
        submission.submission_id,
        submission.student_username,
        submission.status,
        course.name AS course_name  -- Fetch the course name from the course table
      FROM 
        subtask
      LEFT JOIN 
        submission ON subtask.subtask = submission.subtask 
        AND subtask.coursework_id = submission.coursework_id
      LEFT JOIN 
        course ON subtask.course_code = course.course_code
      WHERE 
        subtask.is_locked = 0 
        AND (submission.student_username = ? OR submission.student_username IS NULL)  -- Check for submissions by the logged-in user
    `, [username]); // Use parameterized queries to prevent SQL injection

    return NextResponse.json(rows); // Use NextResponse to send JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ error: 'Failed to fetch subtasks' }, { status: 500 }); // Return error response
  }
}
