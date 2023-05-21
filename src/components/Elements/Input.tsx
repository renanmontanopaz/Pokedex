import React, { InputHTMLAttributes } from 'react';
import { Box, ErrorBadge, IconButtonStyled } from './styles';
import {InputAdornment, TextField, Tooltip, Error as ErrorIcon} from "@mui/material";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    errors?: string | undefined;
    touched?: boolean;
    label?: string;
}

const Input: React.FC<IInputProps> = ({
                                          className,
                                          type,
                                          name,
                                          onChange,
                                          onBlur,
                                          errors,
                                          value,
                                          touched,
                                          placeholder,
                                          label,
                                      }) => {
    function isErrorIcon() {
        if (!errors) {
            return false;
        }
        return (
            <Tooltip title={errors || ''}>
                <IconButtonStyled>
                    <ErrorBadge position="end">
                        <ErrorIcon color="error" />
                    </ErrorBadge>
                </IconButtonStyled>
            </Tooltip>
        );
    }

    return (
        <Box>
            <TextField
                className={className}
                type={type}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
                error={!!touched && !!errors}
                value={value}
                fullWidth
                placeholder={placeholder}
                variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">

                        </InputAdornment>
                    ),
                    endAdornment: isErrorIcon(),
                }}
            />
        </Box>
    );
};

export default Input;