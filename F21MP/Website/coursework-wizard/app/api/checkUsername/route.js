import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  const { username } = await request.json();
  
  try {
    // Query to check if the username exists
    const [result] = await pool.query('SELECT username FROM user WHERE username = ?', [username]);

    if (result.length > 0) {
      return NextResponse.json({ exists: true });
    } else {
      return NextResponse.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json({ exists: false, error: 'Database error' });
  }
}
