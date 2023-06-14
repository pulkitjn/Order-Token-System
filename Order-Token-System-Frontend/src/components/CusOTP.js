import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useContext } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { ToastContext } from "../contextproviders/ToastContext";
import useFormInput from "../customhooks/useFormInput";
import CusOTPValidator from "./CusOTPValidator";
import { getFirstPropValue, isObject } from "../utils";

const Container = styled("div")({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#FFDAB9",
});

const Card = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: "#6c63ff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const CusOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useContext(ToastContext);

  const checkFields = (state) => {
    let res = false;
    res |= !state.firstName;
    res |= !state.lastName;
    res |= !state.email;
    res |= !state.password;
    res |= !state.confirmPassword;
    return res;
  };
  useEffect(() => {
    if (!location.state || checkFields(location.state)) {
      navigate("/");
    }
  });

  const OTP = useFormInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      ...location.state,
      otp: OTP.value,
    };
    const validationErrors = CusOTPValidator(formData);

    if (Object.keys(validationErrors).length > 0) {
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          const errorMessage = validationErrors[field];
          if (field === "otp") {
            OTP.handleError(errorMessage);
          }
        }
      }
      return;
    }

    const verifyEmailOtpAndRegister = async () => {
      try {
        const response = await axios.post("/customers/register", formData);
        showToast(response.data.message, "success");
        navigate("/customer/login");
        console.log(response.data);
      } catch (error) {
        let errMsg;
        if (isObject(error.response.data.error)) {
          errMsg = getFirstPropValue(error.response.data.error);
        } else {
          errMsg = error.response.data.error;
        }
        showToast(errMsg, "error");
        console.log(error);
      }
    };
    verifyEmailOtpAndRegister();
  };

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
        marginX={2}
        marginY={2}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Card>
            <Title variant="h5" align="center">
              Customer Register
            </Title>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                type="text"
                name="otp"
                label="OTP"
                autoComplete="one-time-code"
                value={OTP.value}
                onChange={OTP.onChange}
                required
                error={!!OTP.error}
                helperText={OTP.error}
                fullWidth
                margin="normal"
                size="small"
              />
              <StyledButton variant="contained" fullWidth type="submit">
                Verify Email
              </StyledButton>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CusOTP;
