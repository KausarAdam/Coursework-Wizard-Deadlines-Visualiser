import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {

    const { username, newPassword } = await request.json();

    console.log({ username, newPassword });

    // Ensure required fields are not empty
    if (!username || !newPassword) {
        return NextResponse.json({ message: "Username and new password are required." }, { status: 400 });
      }

    // Update password in the user table
    const [result] = await pool.query(
        "UPDATE user SET password = ? WHERE username = ?",
        [newPassword, username]
      );

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'No records updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 }); // Return error response
  }
}
