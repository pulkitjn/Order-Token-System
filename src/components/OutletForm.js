import React, { useState, useEffect } from "react";
import "../cssfiles/OutletForm.css";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";


const OutletForm = (props) => {

  const [isLogin, setIsLogin] = useState(true);
  const [outletName, setOutletName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFieldsFilled, setIsFieldsFilled] = useState(false); // new state variable
  const setLoggedIn = props.setIsOutletAuth;
  const navigate = useNavigate();


  // useEffect to update isFieldsFilled whenever the required fields change
    useEffect(() => {
      if (outletName && phoneNumber && (isLogin || address)) {
        setIsFieldsFilled(true);
      } else {
        setIsFieldsFilled(false);
      }
    }, [outletName, phoneNumber, address, isLogin]);

  const switchModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onSuccess = (/*response*/) => {
    const formData = {
      outletName: outletName,
      phoneNumber: phoneNumber,
    };
    if(isLogin){
      formData[address] = address;
    }
    console.log(formData); // Replace this with your form submission logic
    //console.log("Google Auth successful!", response.profileObj);
    setLoggedIn(true);
    navigate('/outletdash');
  };

  const onFailure = (response) => {
    console.log("Google Auth failed!", response);
  };

  return (
    <div class="card-container">
      <div className="card">
        <div className="card-header">
          <h2>{isLogin ? "Outlet Log In" : "Outlet Register"}</h2>
        </div>
        <div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Outlet Name"
                  value={outletName}
                  onChange={(event) => setOutletName(event.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                />
              </div>
            </form>

            {/*
              Disabled for now
              <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText={`Sign ${isLogin?'In':'Up'} with Google`}
              className="google-btn"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              disabled={!isFieldsFilled} // disable the button if required fields are not filled
            />*/}
            <button
              
              className="google-btn"
              onClick={onSuccess}
              disabled={!isFieldsFilled} // disable the button if required fields are not filled
            >
              {`Sign ${isLogin?'In':'Up'} with Google`}
            </button>
            <div className="switch">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={switchModeHandler}>Register</button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={switchModeHandler}>Log In</button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <p>OTSApp</p>
        </div>
      </div>
    </div>
  );
};

export default OutletForm;
