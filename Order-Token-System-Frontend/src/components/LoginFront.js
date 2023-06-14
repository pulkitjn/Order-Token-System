import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Container = styled("div")({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  backgroundColor:"#FFDAB9",
});

const Card = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Custom shadow value
  backgroundColor: "#fff",
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  backgroundColor: "#6c63ff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

const Footer = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4)
}));

const LoginFront = () => {
  const navigate = useNavigate();
  const handleCustomer = () =>{
    navigate('/customer/login');
  }
  const handleOutlet = () =>{
    navigate('/outlet/login');
  }
  return (
    <Container>
      <Grid container justifyContent="center" direction="column" alignItems="center" marginX={2} marginY={2}>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Card>
            <Title variant="h4" align="center">
              Welcome to OTS
            </Title>
            <StyledButton variant="contained" fullWidth onClick={handleCustomer}>
              Customer Login/Register
            </StyledButton>
            <StyledButton variant="contained" fullWidth onClick={handleOutlet}>
              Outlet Login/Register
            </StyledButton>
            {/* <Footer variant="body2" align="center">
            © {(new Date()).getFullYear()} OTS All rights reserved
            </Footer> */}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginFront;