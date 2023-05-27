import { Authenticator, CheckboxField, useAuthenticator } from '@aws-amplify/ui-react';

export default function SignUpFormFields() {
  const { validationErrors } = useAuthenticator();
  return (
    <>
      <Authenticator.SignUp.FormFields />
      <CheckboxField
        errorMessage={`${validationErrors.acknowledgement}`}
        hasError={!!validationErrors.acknowledgement}
        name='acknowledgement'
        value='yes'
        label='I agree with the Terms & Conditions'
      />
    </>
  );
}
