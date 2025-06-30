import pool from '@/lib/db';

export async function DELETE(_, { params }) {
  const { id } = params;

  await pool.query('DELETE FROM product WHERE id = $1', [id]);

  return Response.json({ success: true });
}
