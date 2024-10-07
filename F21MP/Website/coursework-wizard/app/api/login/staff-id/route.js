import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  const { staffID } = await request.json();

  if (staffID) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [staffID]);

    if (rows.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }

  return NextResponse.json({ success: false });
}
