import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { components } from './components';
import { formFields } from './formFields';
import { AuthContainer, Logo, Wrapper, Bg } from './styles';
import logo from '../../../../assets/img/logo.svg';

export default function SignIn() {
  return (
    <Wrapper container>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        component={Paper}
        sx={{ backgroundColor: '#F5F5F5' }}
      >
        <Logo
          component='img'
          alt='Crowd Cloud'
          src={logo}
        />
        <AuthContainer>
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
        </AuthContainer>
      </Grid>
      <Bg
        item
        xs={false}
        sm={false}
        md={6}
      />
    </Wrapper>
  );
};
