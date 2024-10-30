import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  const { staffID, password } = await request.json();
  const role = 'Staff';

  if (staffID && password) {
    const [rows] = await pool.query('SELECT * FROM user WHERE username = ? AND password = ? AND role = ?', [staffID, password, role]);

    if (rows.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  }

  return NextResponse.json({ success: false });
}
