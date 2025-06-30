'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Orders.module.css';

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // 🔐 Redirect to login if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', '/orders');
      router.push('/login');
    }
  }, [router]);

  // 🚀 Fetch orders and products
  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const refreshProducts = () => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const clearOrders = async () => {
    if (confirm('Are you sure you want to delete all orders?')) {
      await fetch('/api/orders', { method: 'DELETE' });
      setOrders([]);
    }
  };

  const addItem = async () => {
    if (!name || !price) return alert('Please fill out both fields.');
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    setName('');
    setPrice('');
    refreshProducts();
  };

  const deleteItem = async (id) => {
    if (confirm('Delete this item?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      refreshProducts();
    }
  };

  const updateItemPrice = async (id, newPrice) => {
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: Number(newPrice) }),
    });
    refreshProducts();
  };


  return (
    <div className={styles.container}>
      <button
      onClick={() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('redirectAfterLogin');
        router.push('/login');
      }}
      className={styles.logoutButton}
    >
      🚪 Logout
    </button>
      <h1 className={styles.title}>👨‍💼 Admin Panel – Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className={styles.orderItem}>
              <div className={styles.orderId}>Order #{order.id}</div>
              <div className={styles.timestamp}>Placed at {order.created_at}</div>
              <p>Items:</p>
              <ul>
                {(Array.isArray(order.items) ? order.items : JSON.parse(order.items)).map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.quantity} — ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total:</strong> $
                {(Array.isArray(order.items) ? order.items : JSON.parse(order.items))
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
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
            {prod.name} – $
            <input
              type="number"
              value={prod.price}
              onChange={(e) => {
                const newPrice = e.target.value;
                setProducts(products.map(p =>
                  p.id === prod.id ? { ...p, price: newPrice } : p
                ));
              }}
              style={{ width: '80px', marginLeft: '8px', marginRight: '8px' }}
            />
            <button onClick={() => updateItemPrice(prod.id, prod.price)}>
              Update
            </button>
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
