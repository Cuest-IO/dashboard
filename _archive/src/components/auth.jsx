import { Authenticator, CheckboxField, useAuthenticator } from "@aws-amplify/ui-react";
import { useTheme, View, Image, Text, Heading } from "@aws-amplify/ui-react";
import '../css/index.css';

export const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="left">
            <Image 
              src="/icons/horizontal.png" 
              alt="logo"
              height="54px"
              width="237px"/>      
        </View>
      );
    },
  
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
            &copy; All Rights Reserved
          </Text>
        </View>
      );
    },
  
    SignIn: {
      Header() {
        const { tokens } = useTheme();
  
        return (
          <Heading
            padding={`${tokens.space.medium} 0 0 ${tokens.space.xl}`}
            level={3}
          >
            Sign in to your account
          </Heading>
        );
      },
    //   Footer() {
    //     const { toResetPassword } = useAuthenticator();
  
    //     return (
    //       <View textAlign="center">
    //         <Button
    //           fontWeight="normal"
    //           onClick={toResetPassword}
    //           size="small"
    //           variation="link"
    //         >
    //           Reset Password
    //         </Button>
    //       </View>
    //     );
    //   },
    // },
    },
    SignUp: {
        Header() {
            const { tokens } = useTheme();
    
            return (
            <Heading
                padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
                level={3}
            >
                Create a new account
            </Heading>
            );
        },
        FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
            <>
                {/* Re-use default `Authenticator.SignUp.FormFields` */}
                <Authenticator.SignUp.FormFields />

                {/* Append & require Terms & Conditions field to sign up  */}
                <CheckboxField
                errorMessage={validationErrors.acknowledgement}
                hasError={!!validationErrors.acknowledgement}
                name="acknowledgement"
                value="yes"
                label="I agree with the Terms & Conditions"
                />
            </>
            )  ;
        },
    },
    //   Footer() {
    //     const { toSignIn } = useAuthenticator();
  
    //     return (
    //       <View textAlign="center">
    //         <Button
    //           fontWeight="normal"
    //           onClick={toSignIn}
    //           size="small"
    //           variation="link"
    //         >
    //           Back to Sign In
    //         </Button>
    //       </View>
    //     );
    //   },
    
    // ConfirmSignUp: {
    //   Header() {
    //     const { tokens } = useTheme();
    //     return (
    //       <Heading
    //         padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
    //         level={3}
    //       >
    //         Enter Information:
    //       </Heading>
    //     );
    //   },
    //   Footer() {
    //     return <Text>Footer Information</Text>;
    //   },
    // },
    
    
    
  };

  export const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your email',
      }
    },
    signUp: {
      email: {
        label: "Username",
        placeholder: 'Enter your email',
        order: 1
      },
      given_name: {
        label: "First Name",
        placeholder: 'Enter you first name',
        order: 4
      },
      family_name: {
        label: "Last Name",
        placeholder: 'Enter you last name',
        order: 5
      },
      "custom:Company": {
        label: "Company",
        placeholder: 'Enter your company name',
        order: 6
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