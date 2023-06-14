import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { Button, Grid, TextField, Typography} from "@mui/material";
import { styled } from "@mui/system";

import OutletRegisterValidator from "./OutletRegisterValidator";
import { ToastContext } from "../contextproviders/ToastContext";
import useFormInput from "../customhooks/useFormInput";
import { getFirstPropValue, isObject } from "../utils";
import PasswordTextField from "../customcomponents/PasswordTextField";

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
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: "#6c63ff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const Footer = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const OutletRegister = () => {
  const navigate = useNavigate();
  const {showToast} = useContext(ToastContext);
  const name = useFormInput("");
  const address = useFormInput("");
  const phoneNumber = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      name: name.value,
      address: address.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    const validationErrors = OutletRegisterValidator(formData);

    if (Object.keys(validationErrors).length > 0) {
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          const errorMessage = validationErrors[field];
          if (field === "name") {
            name.handleError(errorMessage);
          } else if (field === "address") {
            address.handleError(errorMessage);
          } else if (field === "phoneNumber") {
            phoneNumber.handleError(errorMessage);
          } else if (field === "email") {
            email.handleError(errorMessage);
          } else if (field === "password") {
            password.handleError(errorMessage);
          } else if (field === "confirmPassword") {
            confirmPassword.handleError(errorMessage);
          }
        }
      }
      return;
    }
    const sendOtp = async () => {
      try {
        const response = await axios.post("/outlets/sendotp", {
          email: formData.email,
        });
        showToast(response.data.message, "info");
        console.log(response.data.message);
        navigate("/outlet/verify", { state: formData });
      } catch (error) {
        let errMsg;
        if(isObject(error.response.data.error)){
          errMsg = getFirstPropValue(error.response.data.error);
        }else{
          errMsg = error.response.data.error;
        }
        showToast(errMsg, 'error');
        console.log(error);
      }
    };
    sendOtp();
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
              Outlet Register
            </Title>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                type="text"
                label="Outlet Name"
                autoComplete="organization"
                value={name.value}
                onChange={name.onChange}
                error={!!name.error}
                helperText={name.error}
                fullWidth
                margin="normal"
                size="small"
              />
              <TextField
                type="text"
                label="Address"
                autoComplete="street-address"
                value={address.value}
                onChange={address.onChange}
                error={!!address.error}
                helperText={address.error}
                required
                fullWidth
                margin="normal"
                size="small"
              />
              <TextField
                type="tel"
                label="Phone Number"
                value={phoneNumber.value}
                onChange={phoneNumber.onChange}
                error={!!phoneNumber.error}
                helperText={phoneNumber.error}
                required
                fullWidth
                margin="normal"
                size="small"
              />
              <TextField
                type="email"
                label="Outlet Email"
                autoComplete="email"
                value={email.value}
                onChange={email.onChange}
                error={!!email.error}
                helperText={email.error}
                required
                fullWidth
                margin="normal"
                size="small"
              />
              <PasswordTextField
                type="password"
                label="New Password"
                autoComplete="new-password"
                value={password.value}
                onChange={password.onChange}
                error={!!password.error}
                helperText={password.error}
                required
                fullWidth
                margin="normal"
                size="small"
              />
              <PasswordTextField
                type="password"
                label="Confirm Password"
                autoComplete="new-password"
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
                error={!!confirmPassword.error}
                helperText={confirmPassword.error}
                required
                fullWidth
                margin="normal"
                size="small"
              />
              <StyledButton type="submit" variant="contained" fullWidth>
                Sign Up
              </StyledButton>
            </form>
            <Typography align="center">
              Already have an account?{" "}
              <Button
                onClick={() => {
                  navigate("/outlet/login");
                }}
              >
                Login
              </Button>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OutletRegister;
