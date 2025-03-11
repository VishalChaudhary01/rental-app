import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';

export const AuthComponents = {
  SignIn: {
    Header() {
      return (
        <Heading level={3} textAlign='center' fontWeight='semibold'>
          Welcomback, Please sign In!
        </Heading>
      );
    },

    Footer() {
      const { toSignUp } = useAuthenticator();
      const router = useRouter();
      return (
        <View className='text-center mt-4'>
          <p className='text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => {
                toSignUp();
                router.replace('/signup');
              }}
              className='text-primary hover:underline bg-transparent border-none p-0'
            >
              Sign up here
            </button>
          </p>
        </View>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <Heading level={3} textAlign='center' fontWeight='semibold'>
          Create a new account
        </Heading>
      );
    },

    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend='Role'
            name='custom:role'
            errorMessage={validationErrors?.['custom:role']}
            hasError={!!validationErrors?.['custom:role']}
            isRequired
          >
            <Radio value='tenant'>Tenant</Radio>
            <Radio value='manager'>Manager</Radio>
          </RadioGroupField>
        </>
      );
    },

    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className='text-center mt-4'>
          <p className='text-muted-foreground'>
            Already have an account?{' '}
            <button
              onClick={toSignIn}
              className='text-primary hover:underline bg-transparent border-none p-0'
            >
              Sign in
            </button>
          </p>
        </View>
      );
    },
  },
};
