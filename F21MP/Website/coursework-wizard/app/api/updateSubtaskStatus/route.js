import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const { subtask, course_code, coursework_id, username, newStatus } = await request.json();

    // Update the submission table status for the given parameters
    const result = await pool.query(`
      UPDATE submission
      SET status = ?
      WHERE subtask = ?
        AND coursework_id = ?
        AND student_username = ?
    `, [newStatus, subtask, coursework_id, username]); // Use parameterized queries to prevent SQL injection

    // Check if any rows were affected
    if (result[0].affectedRows === 0) {
      return NextResponse.json({ error: 'No records updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 }); // Return error response
  }
}
