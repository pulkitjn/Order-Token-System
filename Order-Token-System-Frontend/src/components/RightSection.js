import React, { useState } from 'react';
import '../cssfiles/RightSection.css';
const RightSection = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      email: 'john@example.com',
      items: [
        { name: 'Item 1', token: 'token1', status: 'queued' },
        { name: 'Item 2', token: 'token2', status: 'queued' },
      ],
    },
    {
      id: 2,
      email: 'jane@example.com',
      items: [
        { name: 'Item 3', token: 'token3', status: 'queued' },
        { name: 'Item 4', token: 'token4', status: 'queued' },
        { name: 'Item 5', token: 'token5', status: 'queued' },
      ],
    },
  ]);

  const updateOrderItemStatus = (orderId, itemName, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedItems = order.items.map((item) => {
          if (item.name === itemName) {
            return { ...item, status: newStatus };
          }
          return item;
        });
        return { ...order, items: updatedItems };
      }
      return order;
    });
    setOrders(updatedOrders);
  };
  return (
    <div className="order-status">
      <div className="order-status-title">Order Status</div>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Customer Email</th>
            <th>Order Items</th>
            <th>Token Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.email}</td>
              <td>
                <ul className="order-items no-bullets ">
                  {order.items.map((item) => (
                    <li key={item.token}>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className='order-items no-bullets'>
                  {order.items.map((item) => (
                    <li key={item.token}>
                      <span >{item.token}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className='no-bullets'>
                {order.items.map((item) => (
                    <li key={item.token}>
                        <div className="status-buttons">
                        <button
                          className={`status-button ${item.status === 'queued' ? 'queued' : ''}`}
                          onClick={() => updateOrderItemStatus(order.id, item.name, 'queued')}
                        >
                          Queued
                        </button>
                        <button
                          className={`status-button ${item.status === 'in-process' ? 'in-process' : ''}`}
                          onClick={() => updateOrderItemStatus(order.id, item.name, 'in-process')}
                        >
                          In Process
                        </button>
                        <button
                          className={`status-button ${item.status === 'prepared' ? 'prepared' : ''}`}
                          onClick={() => updateOrderItemStatus(order.id, item.name, 'prepared')}
                        >
                          Prepared
                        </button>
                        <button
                          className={`status-button ${item.status === 'collected' ? 'collected' : ''}`}
                          onClick={() => updateOrderItemStatus(order.id, item.name, 'collected')}
                        >
                          Collected
                        </button>
                      </div>
                    </li>
                  ))}

                </ul>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default RightSection;
