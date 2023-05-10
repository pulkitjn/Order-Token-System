import React, { useState } from "react";
import "../cssfiles/StOrders.css";
import CusWithAuth from "./CusWithAuth";
import { useNavigate } from "react-router-dom";

const exampleOrders = [
  {
    itemName: "Pizza",
    token: 123,
    status: "In Queue",
    outletName: "Pizza Palace",
  },
  {
    itemName: "Burger",
    token: 124,
    status: "In Queue",
    outletName: "Burger Joint",
  },
  {
    itemName: "Salad",
    token: 125,
    status: "In Process",
    outletName: "Greenery Eatery",
  },
  {
    itemName: "Pasta",
    token: 126,
    status: "Prepared",
    outletName: "Pasta Place",
  },
];

const CusOrders = () => {
  const [orders, setOrders] = useState(exampleOrders);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    navigate('/');
  };

  const randomName = "John Doe"; // Random name for demonstration purposes

  return (
    <div className="orders-container">
      <div className="header">
        <h1 className="orders-title">Your Orders</h1>
        <div className="user-info">
          <p>Hi {randomName}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <p className="orders-label">
        Order items ahead of you: {orders.length - 1}
      </p>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Outlet Name</th>
            <th>Token</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.token}>
              <td>{order.itemName}</td>
              <td>{order.outletName}</td>
              <td>{order.token}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CusWithAuth(CusOrders);
