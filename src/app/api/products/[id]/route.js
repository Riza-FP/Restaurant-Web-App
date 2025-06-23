import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function DELETE(request, { params }) {
  const db = await open({
    filename: 'restaurant.db',
    driver: sqlite3.Database,
  });

  await db.run('DELETE FROM product WHERE id = ?', [params.id]);
  await db.close();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
