import {
  Grid,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
} from '@mui/material';
import {
  FC, ReactNode, useEffect, useState,
} from 'react';

interface Props extends Omit<MuiDrawerProps, 'content'> {
  header: ReactNode;
  content: ReactNode;
}
const Drawer: FC<Props> = (props) => {
  const {
    header,
    content,
    onClose,
    children,
    ...restProps
  } = props;

  return (
    <MuiDrawer
      PaperProps={{
        sx: (theme) => (
          {
            top: 0,
            border: 'none',
            backgroundColor: theme.palette.background.paper,
            width: 400,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            p: 6,
          }
        ),
        elevation: 4,
      }}
      anchor="right"
      onClose={onClose}
      {...restProps}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
      >
        {header}
      </Grid>
      <Grid
        container
        direction="column"
        gap={4}
        p={(theme) => theme.spacing(3.5, 3, 0)}
      >
        {content}
      </Grid>
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
