// Core
import { styled } from '@mui/system';
// Parts
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import backgroundImage from "./img/bg.jpg";

export const Logo = styled(Box)({
  height: '54px',
  display: 'block',
  marginTop: '28px',
  marginLeft: '9.5%',
  marginBottom: '10px',
}) as typeof Box;
export const Bg = styled(Grid)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});
export const AuthContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: `calc(100% - 92px)`,
  paddingLeft: '9.5%',
  paddingRight: '9.5%',
});

export const Wrapper = styled(Grid)(() => ({
    height: '100vh',
    '& [data-amplify-authenticator] [data-amplify-router]': {
      borderRadius: '14px',
      overflow: 'hidden',
      border: 'none',
    },
    '& .amplify-button--primary': {
      background: 'linear-gradient(180deg, #FF9CDA 0%, #A777F4 100%)',
      color: '#fff',
      borderRadius: '14px',
      border: 'none',
    },
    '& .amplify-button--disabled': {
      background: 'linear-gradient(180deg, #DFDFDF 0%, #BEBEBE 100%)',
    },
    '& .amplify-tabs-item[data-state=active]': {
      border: 'none',
      color: 'rgba(0, 161, 239, 1)'
    },
    '& .amplify-input': {
      borderRadius: '10px'
    },
    '& .amplify-field': {
      rowGap: 0,
    },
    '& .amplify-field-group__outer-end button': {
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    }
  }),
);
