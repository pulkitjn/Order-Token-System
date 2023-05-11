import { useNavigate } from "react-router-dom";
import "../cssfiles/OutletForm.css";
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from "react";
import OutletLoginValidator from "./OutletLoginValidator";

const OutletLogin = (props) => {
  const navigate = useNavigate();


  const [outletEmail, setOutletEmail] = useState("");
  const [outletPswd, setOutletPswd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onClickHandler = (response) => {

    const formData = {
        email: outletEmail,
        pswd: outletPswd
    };
    const errorMessage = OutletLoginValidator(formData);

    if(errorMessage){
        setErrorMessage(errorMessage);
        return;
    }

    localStorage.setItem("outletToken", "outletloggedin");
    navigate("/outletdash");
  };
  const onFailure = (response) => {
    console.log("Google Auth failed!", response);
  };
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>Outlet Login</h2>
        </div>
        <div>
          <div className="card-body">
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
                placeholder="Password"
                value={outletPswd}
                onChange={(event) => setOutletPswd(event.target.value)}
                required
              />
            </div>
            {errorMessage && <div>{errorMessage}</div>}
            <button className="google-btn" onClick={onClickHandler}>
              {`Sign In`}
            </button>
            <div className="switch">
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => {
                    navigate("/outlet/register");
                  }}
                >
                  Register
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

export default OutletLogin;
