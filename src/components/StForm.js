import { useNavigate } from "react-router-dom";
import "../cssfiles/OutletForm.css";
import { GoogleLogin } from "react-google-login";

const StForm = (props) => {
  const navigate = useNavigate();
  const setLoggedIn = props.setIsStAuth;
  const onSuccess = (response) => {
    //console.log("Google Auth successful!", response.profileObj);
    setLoggedIn(true);
    navigate('/storders');
  };

  const onFailure = (response) => {
    console.log("Google Auth failed!", response);
  };
  return (
    <div class="card-container">
      <div className="card">
        <div className="card-header">
          <h2>Student Login</h2>
        </div>
        <div>
          <div className="card-body">
            {/*<GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              className="google-btn"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
            /> */}
            <button
              className="google-btn"
              onClick={onSuccess}
            >
              {`Sign In with Google`}
            </button>
          </div>
        </div>
        <div className="card-footer">
          <p>OTSApp</p>
        </div>
      </div>
    </div>
  );
};

export default StForm;
