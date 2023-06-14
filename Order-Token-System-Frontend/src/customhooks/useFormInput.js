import React from "react";
const useFormInput = (initialValue) => {
    const [value, setValue] = React.useState(initialValue);
    const [error, setError] = React.useState("");
    
    const handleChange = (event) => {
      setValue(event.target.value);
      setError("");
    };
    
    const handleError = (errorMessage) => {
      setError(errorMessage);
    };
    
    return {
      value,
      onChange: handleChange,
      error,
      handleError,
    };
  };

  export default useFormInput