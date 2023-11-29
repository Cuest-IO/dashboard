import React, { FC } from 'react';
import {FormControlLabel, Switch, SwitchProps } from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = SwitchProps & {
  label: string;
}
const TextInput: FC<Props> = ({ label, ...restProps}) => {
  return (
    <FormControlLabel
      sx={() => ({
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'flex-start'
      })}
      control={
        <Switch
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
