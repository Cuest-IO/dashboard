import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import {components, formFields} from '../../components/auth';
import {  Flex,  Grid,  Image,  useTheme,  View} from "@aws-amplify/ui-react";

 

export default function SignIn() {   
  
  const { tokens } = useTheme();
  
  return (
    <Grid templateColumns={{ base: "1fr 0", medium: "2fr 1fr" }}>
      <Flex
        backgroundColor={tokens.colors.background.secondary}
        justifyContent="center"
      >
        
      <Authenticator
        initialState="signIn"
        formFields={formFields}
        components={components}
        services={{
          async validateCustomSignUp(formData) {
            if (!formData.acknowledgement) {
              return {
                acknowledgement: 'You must agree to the Terms & Conditions',
              };
            }
          },
        }}
      >
  {({ signOut, user }) => (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
      
      </Authenticator>

      </Flex>
      <View >
        <Image
          src="/icons/login.png"
          width="120%"
          height="120%"
          objectFit="cover"
        />
      </View>
    </Grid>


    );
};


// return (
//     <Grid templateColumns={{ base: "1fr 0", medium: "1fr 1fr" }}>
//       <Flex
//         backgroundColor={tokens.colors.background.secondary}
//         justifyContent="center"
//       >
        
//       <Authenticator
//         initialState="signIn"
//         formFields={formFields}
//         components={components}
//         services={{
//           async validateCustomSignUp(formData) {
//             if (!formData.acknowledgement) {
//               return {
//                 acknowledgement: 'You must agree to the Terms & Conditions',
//               };
//             }
//           },
//         }}
//       >
//   {({ signOut, user }) => (
//             <main>
//               <h1>Hello {user.username}</h1>
//               <button onClick={signOut}>Sign out</button>
//             </main>
//           )}
      
//       </Authenticator>

//       </Flex>
//       <View height="100vh">
//         <Image
//           src="/icons/login.png"
//           width="100%"
//           height="100%"
//           objectFit="cover"
//         />
//       </View>
//     </Grid>
