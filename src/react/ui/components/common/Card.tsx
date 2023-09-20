import React from 'react';
import { CardProps, Card as MuiCard, CardHeader } from "@mui/material";

interface Props extends CardProps {
  header?: React.ReactElement;
}

const Card: React.FC<Props> = ({ children, header, sx }) => {
  return (
    <MuiCard
      sx={{
        width: '50%',
        minWidth: '528px',
        minHeight: '260px',
        padding: '16px 24px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 28px rgba(0, 0, 0, 0.04)',
        borderRadius: '20px',
        ...sx
      }}
    >
      {header && <CardHeader title={header} />}
      {children}
    </MuiCard>
  );
};

export default Card;
