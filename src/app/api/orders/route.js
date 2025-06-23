import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function POST(req) {
  const body = await req.json();
  const db = await open({ filename: 'restaurant.db', driver: sqlite3.Database });
  const result = await db.run('INSERT INTO orders (items) VALUES (?)', JSON.stringify(body.items));
  await db.close();
  return new Response(JSON.stringify({ status: 'success', id: result.lastID }));
}


export async function GET() {
  const db = await open({ filename: 'restaurant.db', driver: sqlite3.Database });
  const orders = await db.all('SELECT * FROM orders ORDER BY created_at DESC');
  await db.close();
  return new Response(JSON.stringify(orders));
}

export async function DELETE() {
  const db = await open({ filename: 'restaurant.db', driver: sqlite3.Database });
  await db.run('DELETE FROM orders');
  await db.close();
  return new Response(JSON.stringify({ success: true }));
}
