import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OutletForm from "./components/OutletForm";
import StForm from "./components/StForm";
import LoginFront from "./components/LoginFront";
import OutletDashboard from "./components/OutletDash";
import { Navigate } from "react-router-dom";
import StOrders from "./components/StOrders";

const App = () => {
  const [isStudentAuthenticated, setIsStudentAuthenticated] = useState(false);
  const [isOutletAuthenticated, setIsOutletAuthenticated] = useState(false);
  const PrivateRoute = ({ isAuthenticated, redirectTo, children }) => {
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to={redirectTo} replace={true} />
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginFront />} />
        <Route path="/student" element={<StForm setIsStAuth = {setIsStudentAuthenticated}/>} />
        <Route path="/outlet" element={<OutletForm setIsOutletAuth = {setIsOutletAuthenticated}/>} />
        <Route
          path="/outletdash"
          element={
            <PrivateRoute
              isAuthenticated={isOutletAuthenticated}
              redirectTo="/outlet"
            >
              <OutletDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/storders"
          element={
            <PrivateRoute
              isAuthenticated={isStudentAuthenticated}
              redirectTo="/student"
            >
              <StOrders />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<LoginFront />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
