import pool from '../../../../lib/db';

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      return Response.json({ success: true, user: result.rows[0] });
    } else {
      return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (err) {
    return Response.json({ success: false, message: err.message }, { status: 500 });
  }
}
