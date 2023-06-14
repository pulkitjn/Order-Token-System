import { Snackbar, Alert } from "@mui/material";

const Toast = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        variant="filled"
        severity={severity}
        onClose={onClose}
        sx={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
