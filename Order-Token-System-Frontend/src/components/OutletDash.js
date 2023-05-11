import React from "react";
import "../cssfiles/outletdash.css";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import OutletWithAuth from "./OutletWithAuth";
import Navbar from "./Navbar";

const OutletDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="left">
          <LeftSection />
        </div>
        <div className="right">
          <RightSection />
        </div>
      </div>
    </>
  );
};

export default OutletWithAuth(OutletDashboard);
