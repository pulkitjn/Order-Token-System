import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CusLogin from "./components/CusLogin";
import CusRegister from "./components/CusRegister";
import LoginFront from "./components/LoginFront";
import OutletDashboard from "./components/OutletDash";
import CusOrders from "./components/CusOrders";
import CusOTP from "./components/CusOTP";
import OutletLogin from "./components/OutletLogin";
import OutletRegister from "./components/OutletRegister";
import OutletOTP from "./components/OutletOTP";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginFront />} />
        <Route path="/customer/login" element={<CusLogin/>} />
        <Route path="/outlet/login" element={<OutletLogin/>} />
        <Route path="/outlet/register" element={<OutletRegister/>} />
        <Route path="/outlet/verify" element={<OutletOTP/>} />
        <Route path="/customer/register" element={<CusRegister/>} />
        <Route path="/customer/verify" element = {<CusOTP/>} />
        <Route path="/outletdash" element={<OutletDashboard/>} />
        <Route path="/cusorders" element={<CusOrders/>} />
        <Route path="*" element={<LoginFront />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
