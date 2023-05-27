// Parts
import Footer from './Footer';
import SignInHeader from './SignInHeader';
import SignUpHeader from './SignUpHeader';
import SignUpFormFields from './SignUpFormFields';

export const components = {
  Footer,
  SignIn: {
    Header: SignInHeader,
  },
  SignUp: {
    Header: SignUpHeader,
    FormFields: SignUpFormFields,
  },
};
