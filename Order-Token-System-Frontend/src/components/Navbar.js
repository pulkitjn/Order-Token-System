import React from 'react';
import '../cssfiles/Navbar.css'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
 const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('outletToken');
    navigate('/');
  }
  return (
    <nav className="navbar">
      <div className="navbar__outlet">Sai Kripa</div>
      <button className="navbar__logout" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
