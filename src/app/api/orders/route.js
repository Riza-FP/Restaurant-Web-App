import pool from '../../../../lib/db';

export async function POST(request) {
  const { items } = await request.json();
  await pool.query('INSERT INTO orders (items) VALUES ($1)', [JSON.stringify(items)]);
  return Response.json({ success: true });
}

export async function GET() {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  const orders = result.rows.map(order => ({
  ...order,
  items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
}));
  return Response.json(result.rows);
}

export async function DELETE() {
  await pool.query('DELETE FROM orders');
  return Response.json({ success: true });
}
