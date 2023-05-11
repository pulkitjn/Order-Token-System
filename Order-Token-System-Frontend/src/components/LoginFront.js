import React from "react";
import { useNavigate } from "react-router-dom";
import "../cssfiles/OutletForm.css";

const LoginFront = () => {
    const navigate = useNavigate();
    const handleSt = () =>{
        navigate('/customer/login');
    }
    const handleOt = () =>{
        navigate('/outlet/login');

    }
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>Welcome to Order Token System</h2>
        </div>
        <div className="login-buttons-container">
          <button className="mybtn" onClick={handleSt}>Customer Login/ Register</button>
          <button className="mybtn"onClick={handleOt}>Outlet Login/ Register</button>
        </div>
        <div className="card-footer">
          <p>OTSApp</p>
        </div>
      </div>
    </div>
  );
};

export default LoginFront;
