import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ButtonMUI from '@mui/material/Button';

interface ButtonProps {
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
  type?: 'button' | 'submit';
  to?: string;
  children?: ReactNode;
}

export function Button(props: ButtonProps): JSX.Element {
  const { disabled, type, children, to, variant } = props;
  return (
    <ButtonMUI disabled={disabled} type={type} variant={variant}>
      {to ? <Link to={to}>{children}</Link> : children}
    </ButtonMUI>
  );
}

Button.defaultProps = {
  to: undefined,
  children: undefined,
  disabled: false,
  variant: 'contained',
  type: 'button',
};
