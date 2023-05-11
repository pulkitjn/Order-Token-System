import React, { useState } from 'react';
import '../cssfiles/LeftSection.css';

const LeftSection = () => {
  const [dropdowns, setDropdowns] = useState([{ id: 1 , quantity: 1}]);
  const [email, setEmail] = useState('');

  const handleAddDropdown = () => {
    setDropdowns([...dropdowns, { id: dropdowns.length + 1, quantity: 1 }]);
  };

  const handleRemoveDropdown = (id) => {
    setDropdowns(dropdowns.filter((dropdown) => dropdown.id !== id));
  };

  const handleQuantityChange = (id, quantity) => {
    setDropdowns(
      dropdowns.map((dropdown, index) => {
        if (index === id) {
          return { ...dropdown, quantity };
        }
        return dropdown;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submit logic here
  };

  return (
    <div className="left-section">
      <div className="title-bar">
        New Order
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Customer Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="order-list-container">
          <h3 className="order-list-title">Items</h3>
        </div>
        <div className="add-order-container">
          <button className="add-order-button" onClick={handleAddDropdown}>
            Add Item
          </button>
        </div>
        <div className="dropdown-container">
          {dropdowns.map((dropdown, index) => (
            <div key={dropdown.id} className="dropdown">
              <select>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              <div className="quantity-container">
                <button
                  className="quantity-button"
                  onClick={() =>
                    handleQuantityChange(index, dropdown.quantity - 1)
                  }
                  disabled={dropdown.quantity === 1}
                >
                  -
                </button>
                <span className="quantity">{dropdown.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() =>
                    handleQuantityChange(index, dropdown.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              {dropdowns.length > 1 && (
                <button
                  className="remove-dropdown-button"
                  onClick={() => handleRemoveDropdown(dropdown.id)}
                >
                  &#x2715;
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="submit-container">
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeftSection;
