import React, { FC } from 'react';
import { FormControlLabel, TextField, TextFieldProps } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = TextFieldProps & {
  label: string;
}
const TextInput: FC<Props> = ({ label, ...restProps}) => {
  return (
    <FormControlLabel
      sx={() => ({
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'flex-start'
      })}
      control={
        <TextField
          {...restProps}
        />
      }
      label={
        <Typography
          variant='h6'
          fontWeight={700}
          color={(theme) => theme.palette.secondary.main}
        >
          {label}
        </Typography>
      }
    />
  );
};

export default TextInput;
