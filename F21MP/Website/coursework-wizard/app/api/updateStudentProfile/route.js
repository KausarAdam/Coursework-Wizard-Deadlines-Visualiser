import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {

    const { preferredName, bio, username, linkedin, instagram, github, picture } = await request.json();

    console.log({ preferredName, bio, username, linkedin, instagram, github, picture });

    // Ensure required fields are received
    if (!username) {
      throw new Error("Missing required field: username");
    }

    // Update based on the username
    const result = await pool.query(`
      UPDATE student
      SET preferred_name = ?, description = ?, linkedin = ?, instagram = ?, github = ?, picture = ?
      WHERE username = ?;
    `, [preferredName, bio, linkedin, instagram, github, picture, username]);

    // Check if any rows were affected
    if (result[0].affectedRows === 0) {
      return NextResponse.json({ error: 'No records updated' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 }); // Return error response
  }
}
