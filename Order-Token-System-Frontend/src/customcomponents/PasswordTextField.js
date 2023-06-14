import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordTextField = ({...restProps}) =>{
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () =>{
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            {...restProps}
            type = {showPassword? 'text' : 'password'}
            InputProps={{
                endAdornment:(
                    <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                )
            }}/>
    )
}

export default PasswordTextField;