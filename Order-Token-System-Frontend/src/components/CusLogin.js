import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useContext } from "react";

import CusLoginValidator from "./CusLoginValidator";
import useFormInput from "../customhooks/useFormInput";
import { ToastContext } from "../contextproviders/ToastContext";
import { CustomerAuthContext } from "../contextproviders/CustomerAuthContext";
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

const CusLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const { loginCustomer } = useContext(CustomerAuthContext);

  const email = useFormInput("");
  const password = useFormInput("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: email.value,
      password: password.value,
    };

    const validationErrors = CusLoginValidator(formData);
    if (Object.keys(validationErrors).length > 0) {
      for (const field in validationErrors) {
        if (validationErrors.hasOwnProperty(field)) {
          const errorMessage = validationErrors[field];
          if (field === "email") {
            email.handleError(errorMessage);
          } else if (field === "password") {
            password.handleError(errorMessage);
          }
        }
      }
      return;
    }
    const login = async () => {
      try {
        const response = await axios.post("/customers/login", formData);
        loginCustomer(response.data.accessToken);
        showToast(response.data.message, "success");
        navigate("/customer/dashboard");
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
    login();
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
              Customer Login
            </Title>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                type="email"
                name="email"
                label="User Email"
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
                label="Password"
                autoComplete="current-password"
                value={password.value}
                onChange={password.onChange}
                required
                error={!!password.error}
                helperText={password.error}
                fullWidth
                margin="normal"
                size="small"
              />
              <StyledButton variant="contained" type="submit" fullWidth>
                Sign In
              </StyledButton>
            </form>
            <Typography align="center">
              Don't have an account?{" "}
              <Button
                onClick={() => {
                  navigate("/customer/register");
                }}
              >
                Register
              </Button>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CusLogin;
