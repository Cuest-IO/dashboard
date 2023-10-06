import React from 'react';
import { CardProps, Card as MuiCard, CardHeader } from "@mui/material";

interface Props extends CardProps {
  header?: React.ReactElement;
}

const Card: React.FC<Props> = ({ children, header, sx }) => {
  return (
    <MuiCard
      sx={{
        display: 'flex',
        gap: 4,
        flexDirection: 'column',
        width: '50%',
        minWidth: '528px',
        maxWidth: '528px',
        minHeight: '260px',
        px: 6,
        py: 4,
        boxShadow: '0px 4px 28px rgba(0, 0, 0, 0.04)',
        borderRadius: 5,
        ...sx
      }}
    >
      {header && <CardHeader title={header} sx={{ p: 0 }} />}
      {children}
    </MuiCard>
  );
};

export default Card;
