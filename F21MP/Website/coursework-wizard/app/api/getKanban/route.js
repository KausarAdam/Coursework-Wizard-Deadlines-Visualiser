import { NextResponse } from "next/server"; // Import NextResponse
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username"); // Get the username from query params

    // Unlock subtasks if their start date has passed
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // SQL query to unlock subtasks
    await pool.query(`
      UPDATE subtask
      SET is_locked = 0
      WHERE start_date <= ?
      AND is_locked = 1
    `, [today]); // Update is_locked to 0 for relevant subtasks

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
        course.name AS course_name
      FROM 
        subtask
      LEFT JOIN 
        submission ON subtask.subtask = submission.subtask 
        AND subtask.coursework_id = submission.coursework_id
      LEFT JOIN 
        course ON subtask.course_code = course.course_code
      WHERE 
        subtask.is_locked = 0 
        AND (submission.student_username = ? OR submission.student_username IS NULL)
    `, [username]); // Use parameterized queries to prevent SQL injection

    return NextResponse.json(rows); // Use NextResponse to send JSON response
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ error: 'Failed to fetch subtasks' }, { status: 500 }); // Return error response
  }
}
