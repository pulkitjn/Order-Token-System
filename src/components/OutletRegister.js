import { useNavigate } from "react-router-dom";
import "../cssfiles/OutletForm.css";
import { useState, useEffect } from "react";
import OutletRegisterValidator from "./OutletRegisterValidator";

const OutlletRegister = () => {
  const navigate = useNavigate();

  const [outletName, setOutletName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [outletEmail, setOutletEmail] = useState("");
  const [outletPswd, setOutletPswd] = useState("");
  const [outletCfrmPswd, setOutletCfrmPswd] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const onClickHandler = (response) => {
    const formData = {
        name : outletName,
        address: address,
        phoneNo: phoneNumber,
        email: outletEmail,
        pswd: outletPswd,
        cnfrmPswd: outletCfrmPswd,
    };

    const errorMessage = OutletRegisterValidator(formData);

    if(errorMessage){
        setErrorMessage(errorMessage)
        return;
    }

    navigate("/outlet/verify" , {state :{outletEmail:outletEmail}});
  };

  const onFailure = (response) => {
    console.log("Google Auth failed!", response);
  };
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>Outlet Register</h2>
        </div>
        <div>
          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                placeholder="Outlet Name"
                value={outletName}
                onChange={(event) => setOutletName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Outlet Email"
                value={outletEmail}
                onChange={(event) => setOutletEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="New Password"
                value={outletPswd}
                onChange={(event) => setOutletPswd(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={outletCfrmPswd}
                onChange={(event) => setOutletCfrmPswd(event.target.value)}
                required
              />
            </div>
            {errorMessage && <div>{errorMessage}</div>}
            <button className="google-btn" onClick={onClickHandler}>
              {`Sign Up`}
            </button>
            <div className="switch">
              <>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    navigate("/outlet/login");
                  }}
                >
                  Login
                </button>
              </>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <p
            className="appname"
            onClick={() => {
              navigate("/");
            }}
          >
            OTSApp
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutlletRegister;
