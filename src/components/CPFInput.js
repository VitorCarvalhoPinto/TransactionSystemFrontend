import React from "react";
import InputMask from "react-input-mask";
import TextField from "@mui/material/TextField";

const CPFInput = ({ value, onChange }) => {
  return (
    <InputMask
      mask="999.999.999-99"
      value={value}
      onChange={onChange}
      maskChar=""
    >
      {(inputProps) => <TextField {...inputProps} label="CPF" size="small" />}
    </InputMask>
  );
};

export default CPFInput;
