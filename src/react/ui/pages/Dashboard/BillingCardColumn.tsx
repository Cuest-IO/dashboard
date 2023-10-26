import React from 'react';
import Box from '@mui/material/Box';
import { ArrowDownRed, ArrowUpGreen } from '../../components/common/icons';
import Typography from '@mui/material/Typography';
import { Grid, Theme } from '@mui/material';

interface Props {
  icon: React.ReactNode;
  description: string;
  value: string;
  iconBg: keyof Theme['palette']['common']
  compare: {
    oldVal: number;
    newVal: number;
  }
}

const BillingCardColumn: React.FC<Props> = ({
  description,
  value,
  icon,
  compare,
  iconBg
}) => {
  const renderPercentageCompare = (oldVal: number, newVal: number) => {
    const delta = ((newVal - oldVal) / Math.abs(oldVal)) * 100
    return (
      <Box
        p={1}
        sx={(theme) => ({
          backgroundColor:
            delta >= 0
              ? theme.palette.common["teritrary.green"]
              : theme.palette.common["teritrary.red"],
          borderRadius: 2,
          display: 'flex',
          width: 'fit-content',
          alignItems: 'center',
          gap: 1,
        })}
      >
        {delta >= 0 ? (
          <ArrowUpGreen />
        ) : (
          <ArrowDownRed />
        )}
        <Typography
          variant='subtitle2'
          fontWeight={700}
          color={(theme) => delta >= 0
            ? theme.palette.common["secondary.green"]
            : theme.palette.common["secondary.red"]}
          sx={{
            display: 'inline-block'
          }}
        >
          {delta.toFixed(1)}%
        </Typography>
      </Box>
    )
  }

  return (
    <Grid
      container
      direction='column'
      gap={3}
    >
      <Box
        width={(theme) => theme.spacing(12)}
        height={(theme) => theme.spacing(12)}
        sx={(theme) => ({
          backgroundColor: theme.palette.common[iconBg],
          borderRadius: 10,
          textAlign: 'center',
          lineHeight: theme.spacing(14.5)
        })}
      >
        {icon}
      </Box>
      <Typography
        variant='body2'
        color={(theme) => theme.palette.secondary.light}
      >
        {description}
      </Typography>
      <Typography
        variant='h2'
        fontWeight={700}
        fontSize='44px'
        color={(theme) => theme.palette.secondary.main}
      >
        {value}
      </Typography>
      {renderPercentageCompare(compare.oldVal, compare.newVal)}
    </Grid>
  );
};

export default BillingCardColumn;
