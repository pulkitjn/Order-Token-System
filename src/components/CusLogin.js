import { useNavigate } from "react-router-dom";
import "../cssfiles/OutletForm.css";
import { GoogleLogin } from "react-google-login";
import { useState, useEffect } from "react";
import CusLoginValidator from "./CusLoginValidator";

const CusLogin = (props) => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPswd, setUserPswd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onClickHandler = (response) => {
    localStorage.setItem("customerToken", "custloggedin");

    const formData = {
      email: userEmail,
      pswd: userPswd,
    };

    const errorMessage = CusLoginValidator(formData);
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    navigate("/cusorders");
  };

  const onFailure = (response) => {
    console.log("Google Auth failed!", response);
  };
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>Customer Login</h2>
        </div>
        <div>
          <div className="card-body">
            <div className="form-group">
              <input
                type="email"
                placeholder="User Email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={userPswd}
                onChange={(event) => setUserPswd(event.target.value)}
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
                    navigate("/customer/register");
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

export default CusLogin;
