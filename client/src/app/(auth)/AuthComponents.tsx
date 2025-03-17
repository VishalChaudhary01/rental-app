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
  Header() {
    return (
      <View className='mt-4'>
        <Heading level={3} className='!text-2xl !font-bold !px-2'>
          RENTAL <span className=''>APP</span>
        </Heading>
      </View>
    );
  },

  SignIn: {
    Header() {
      return (
        <p className='text-muted-foreground mb-4'>Fill the form to Sign In</p>
      );
    },

    Footer() {
      const router = useRouter();
      return (
        <View className='text-center mt-4'>
          <p className='text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <button
              onClick={() => {
                router.push('/signup');
              }}
              className='text-primary hover:underline bg-transparent border-none p-0 cursor-pointer'
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
        <p className='text-muted-foreground mb-4'>
          Fill the form to Create new account
        </p>
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
      const router = useRouter();
      return (
        <View className='text-center mt-4'>
          <p className='text-muted-foreground'>
            Already have an account?{' '}
            <button
              onClick={() => router.push('/signin')}
              className='text-primary hover:underline bg-transparent border-none cursor-pointer p-0'
            >
              Sign in
            </button>
          </p>
        </View>
      );
    },
  },
};
