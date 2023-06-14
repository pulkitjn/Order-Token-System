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
import { ToastProvider } from "./contextproviders/ToastContext";
import { CustomerAuthProvider } from "./contextproviders/CustomerAuthContext";
import { OutletAuthProvider } from "./contextproviders/OutletAuthContext";
import CusWithAuth from "./components/CusWithAuth";

const App = () => {
  return (
    <BrowserRouter>
      <CustomerAuthProvider>
        <OutletAuthProvider>
          <ToastProvider>
            <Routes>
              <Route exact path="/" element={<LoginFront />} />
              <Route path="/customer/login" element={<CusLogin />} />
              <Route path="/outlet/login" element={<OutletLogin />} />
              <Route path="/outlet/register" element={<OutletRegister />} />
              <Route path="/outlet/verify" element={<OutletOTP />} />
              <Route path="/customer/register" element={<CusRegister />} />
              <Route path="/customer/verify" element={<CusOTP />} />
              <Route path="/outlet/dashboard" element={<OutletDashboard />} />
              <Route path="/customer/dashboard" element={<CusOrders/>} />
              <Route path="*" element={<LoginFront />} />
            </Routes>
          </ToastProvider>
        </OutletAuthProvider>
      </CustomerAuthProvider>
    </BrowserRouter>
  );
};

export default App;
