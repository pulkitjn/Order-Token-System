import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

import CusRegisterValidator from "./CusRegisterValidator";
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
  variant: "h5",
  textAlign: "center",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: "#6c63ff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const CusRegister = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    const validationErrors = CusRegisterValidator(formData);

    if (Object.keys(validationErrors).length > 0) {
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          const errorMessage = validationErrors[field];
          if (field === "firstName") {
            firstName.handleError(errorMessage);
          } else if (field === "lastName") {
            lastName.handleError(errorMessage);
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
        const response = await axios.post("/customers/sendotp", {
          email: formData.email,
        });
        console.log(response);
        showToast(response.data.message, "info");
        console.log(response.data.message);
        navigate("/customer/verify", { state: formData });
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
            <Title variant="h5">Customer Register</Title>
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    name="firstName"
                    label="First Name"
                    autoComplete="given-name"
                    value={firstName.value}
                    onChange={firstName.onChange}
                    required
                    error={!!firstName.error}
                    helperText={firstName.error}
                    fullWidth
                    margin="normal"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    name="lastName"
                    label="Last Name"
                    autoComplete="family-name"
                    value={lastName.value}
                    onChange={lastName.onChange}
                    required
                    error={!!lastName.error}
                    helperText={lastName.error}
                    fullWidth
                    margin="normal"
                    size="small"
                  />
                </Grid>
              </Grid>
              <TextField
                type="email"
                name="email"
                label="Email"
                autoComplete="email"
                value={email.value}
                onChange={email.onChange}
                required
                error={!!email.error}
                helperText={email.error}
                fullWidth
                margin="normal"
                size="small"
              />
              <PasswordTextField
                name="password"
                label="New Password"
                autoComplete="new-password"
                value={password.value}
                onChange={password.onChange}
                required
                error={!!password.error}
                helperText={password.error}
                fullWidth
                margin="normal"
                size="small"
              />
              <PasswordTextField
                name="confirmPassword"
                label="Confirm Password"
                autoComplete="new-password"
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
                required
                error={!!confirmPassword.error}
                helperText={confirmPassword.error}
                fullWidth
                margin="normal"
                size="small"
              />
              <StyledButton variant="contained" type="submit" fullWidth>
                Sign Up
              </StyledButton>
            </form>
            <Typography align="center">
              Already have an account?{" "}
              <Button
                onClick={() => {
                  navigate("/customer/login");
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

export default CusRegister;
