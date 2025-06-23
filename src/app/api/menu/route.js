import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function GET() {
  const db = await open({
    filename: './restaurant.db',
    driver: sqlite3.Database
  });

  const products = await db.all('SELECT * FROM product');
  await db.close();

  return Response.json(products);
}
