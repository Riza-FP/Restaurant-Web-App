import pool from '../../../../lib/db';

export async function GET() {
  const result = await pool.query('SELECT * FROM product');
  return Response.json(result.rows);
}

export async function POST(request) {
  const { name, price } = await request.json();

  await pool.query(
    'INSERT INTO product (name, price) VALUES ($1, $2)',
    [name, price]
  );

  return Response.json({ success: true });
}
