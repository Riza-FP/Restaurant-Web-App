'use client';


import { useEffect, useState } from 'react';
import styles from './Orders.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Fetch orders and menu items
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Clear all orders
  const clearOrders = async () => {
    if (confirm("Are you sure you want to delete all orders?")) {
      await fetch('/api/orders', { method: 'DELETE' });
      setOrders([]);
    }
  };

  // Delete one order
  const deleteOrder = async (id) => {
    if (confirm("Delete this order?")) {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  // Add new menu item
  const addItem = async () => {
    if (!name || !price) return alert("Please fill out both fields.");
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName('');
    setPrice('');
    refreshProducts();
  };

  // Delete a menu item
  const deleteItem = async (id) => {
    if (confirm("Delete this item?")) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      refreshProducts();
    }
  };

  // Refresh menu items
  const refreshProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>👨‍💼 Admin Panel – Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className={styles.orderItem}>
              <div className={styles.orderId}>Order #{order.id}</div>
              <div className={styles.timestamp}>Placed at {new Date(order.created_at).toLocaleString()}</div>
              <p>Items:</p>
              <ul>
                {JSON.parse(order.items).map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.quantity} — ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total:</strong> $
                {JSON.parse(order.items)
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
              <button
                onClick={() => deleteOrder(order.id)}
                className={styles.deleteButton}
              >
                Delete Order
              </button>
            </li>
          ))}
        </ul>
      )}

      {orders.length > 0 && (
        <button onClick={clearOrders} className={styles.clearButton}>
          🗑️ Delete All Orders
        </button>
      )}

      <hr style={{ margin: '2rem 0' }} />
      <h2>📋 Edit Menu Items</h2>

      <div className={styles.addForm}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item name"
        />
        <input
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            {prod.name} - ${prod.price.toFixed(2)}
            <button
              onClick={() => deleteItem(prod.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
