import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { subtask, course_code, coursework_id, username, newStatus, filePath } = await request.json();

    // Update the submission table with the file path, status, and submission date
    const result = await pool.query(`
      UPDATE submission
      SET status = ?, file_attachment = ?, submission_date = NOW()
      WHERE subtask = ?
        AND coursework_id = ?
        AND student_username = ?
    `, [newStatus, filePath, subtask, coursework_id, username]); // Using parameterized queries to prevent SQL injection

    // Check if any rows were affected
    if (result[0].affectedRows === 0) {
      return NextResponse.json({ error: 'No records updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Submission updated successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
  }
}
