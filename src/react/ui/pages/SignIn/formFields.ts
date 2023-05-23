export const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    email: {
      label: 'Username',
      placeholder: 'Enter your email',
      order: 1,
    },
    given_name: {
      label: 'First Name',
      placeholder: 'Enter you first name',
      order: 4,
    },
    family_name: {
      label: 'Last Name',
      placeholder: 'Enter you last name',
      order: 5,
    },
    'custom:Company': {
      label: 'Company',
      placeholder: 'Enter your company name',
      order: 6,
    },

    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      order: 2,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 3,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: 'Enter your Password:',
    },
  },
  resetPassword: {
    username: {
      placeholder: 'Enter your email:',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      placeholder: 'Enter your Confirmation Code:',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      placeholder: 'Enter your Password Please:',
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};
