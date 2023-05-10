import { useNavigate } from "react-router-dom";
import "../cssfiles/OutletForm.css";
import { useState } from "react";
import cusRegisterValidator from "./CusRegisterValidator";

const CusRegister = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPswd, setUserPswd] = useState("");
  const [userCfrmPswd, setUserCfrmPswd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onClickHandler = (response) => {
    const formData = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      pswd: userPswd,
      cnfrmPswd: userCfrmPswd,
    };

    const errorMessage = cusRegisterValidator(formData);

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    navigate("/customer/verify", {state :{userEmail:userEmail}});
  };

  const onFailure = (response) => {
    console.log("Google Auth failed!", response);
  };
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>Customer Register</h2>
        </div>
        <div>
          <div className="card-body">
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={userFirstName}
                onChange={(event) => setUserFirstName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                value={userLastName}
                onChange={(event) => setUserLastName(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="New Password"
                value={userPswd}
                onChange={(event) => setUserPswd(event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={userCfrmPswd}
                onChange={(event) => setUserCfrmPswd(event.target.value)}
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
                    navigate("/customer/login");
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

export default CusRegister;
