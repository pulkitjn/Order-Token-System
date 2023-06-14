import React, { createContext, useState } from "react";
import Toast from "../customcomponents/Toast";
const ToastContext = createContext();
const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const showToast = (message, severity) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const hideToast = () => {
    setToast((toast) => {
      return {
        ...toast,
        open: false,
      };
    });
  };

  const value = {
    showToast,
    hideToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast.open && (
        <Toast
          open={toast.open}
          onClose={hideToast}
          message={toast.message}
          severity={toast.severity}
        />
      )}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
