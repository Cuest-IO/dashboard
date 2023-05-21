// Core
import { Authenticator } from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
// Parts
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { components } from './components';
import { formFields } from './formFields';
import { Wrapper } from './styles';
// Helpers
import backgroundImage from './img/bg.jpg';
import logo from './img/logo.svg';

export function SignIn() {
  return (
    <Wrapper container>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        component={Paper}
        sx={{
          backgroundColor: '#F5F5F5',
        }}
      >
        <Box
          component='img'
          sx={{
            height: '54px',
            display: 'block',
            marginTop: '28px',
            marginLeft: '9.5%',
            marginBottom: '10px',
          }}
          alt='Crowd Cloud'
          src={logo}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `calc(100% - 92px)`,
            paddingLeft: '9.5%',
            paddingRight: '9.5%',
          }}
        >
          <Authenticator
            initialState='signIn'
            formFields={formFields}
            components={components}
            services={{
              async validateCustomSignUp(formData) {
                if (!formData.acknowledgement) {
                  return {
                    acknowledgement: 'You must agree to the Terms & Conditions',
                  };
                }
                return undefined;
              },
            }}
          >
            {({ signOut, user }) => (
              <main>
                <h1>Hello {user?.username}</h1>
                <button onClick={signOut}>Sign out</button>
              </main>
            )}
          </Authenticator>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={6}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </Wrapper>
  );
};
