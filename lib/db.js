import { Pool } from 'pg';

const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'restaurantdb',
  password: 'mypassword',
  port: 5432,
});

export default pool;
