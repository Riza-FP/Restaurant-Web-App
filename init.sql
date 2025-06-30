-- Create product table
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- Insert sample products
INSERT INTO product (name, price) VALUES
('Burger', 5.00),
('Pizza', 8.00),
('Salad', 4.00);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Insert admin user (password stored in plain text for demo)
INSERT INTO users (email, password) VALUES
('riza@example.com', 'rizafp12');

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    items JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);