import React from 'react';
import '../cssfiles/outletdash.css';
import LeftSection from './LeftSection';
import RightSection from './RightSection';

const OutletDashboard = () => {
  return (
    <div className="container">
      <div className="left">
        <LeftSection />
      </div>
      <div className="right">
        <RightSection />
      </div>
    </div>
  );
};

export default OutletDashboard;