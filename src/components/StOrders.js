import React, { useState } from 'react';
import '../cssfiles/StOrders.css';

const exampleOrders = [
  { itemName: 'Pizza', token: 123, status: 'In Queue' },
  { itemName: 'Burger', token: 124, status: 'In Queue' },
  { itemName: 'Salad', token: 125, status: 'In Process' },
  { itemName: 'Pasta', token: 126, status: 'Prepared' },
];

const StOrders = () => {
  const [orders, setOrders] = useState(exampleOrders);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      <p className="orders-label">Order items ahead of you: {orders.length - 1}</p>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Token</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.token}>
              <td>{order.itemName}</td>
              <td>{order.token}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StOrders;
