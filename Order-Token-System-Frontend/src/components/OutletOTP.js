import { useNavigate , useLocation} from "react-router-dom";
import "../cssfiles/OutletForm.css";
import { useState, useEffect } from "react";

const OutletOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(!location.state || !location.state.outletEmail){
      navigate('/');
    }
  }, [])

  const [OTP, setOTP] = useState('')

  const onClickHandler = (response) => {
    navigate("/outlet/login");
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
                placeholder="Enter OTP"
                value={OTP}
                onChange={(event) => setOTP(event.target.value)}
                required
              />
            </div>

            <button className="google-btn" onClick={onClickHandler}>
              {`Verify Email`}
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

export default OutletOTP;
