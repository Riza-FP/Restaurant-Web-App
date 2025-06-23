import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// GET all products
export async function GET() {
  const db = await open({
    filename: 'restaurant.db',
    driver: sqlite3.Database,
  });

  const products = await db.all('SELECT * FROM product');
  await db.close();

  return new Response(JSON.stringify(products), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// POST a new product
export async function POST(request) {
  const { name, price } = await request.json();

  const db = await open({
    filename: 'restaurant.db',
    driver: sqlite3.Database,
  });

  await db.run('INSERT INTO product (name, price) VALUES (?, ?)', [name, price]);
  await db.close();

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
