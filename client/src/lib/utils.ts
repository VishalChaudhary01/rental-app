import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const containerVarients = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

export const itemVarients = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const createEndpoint =
    userRole?.toLowerCase() === 'manager' ? '/managers' : '/tenants';

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: 'POST',
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || '',
      phoneNumber: '',
    },
  });

  if (createUserResponse.error) {
    throw new Error('Failed to create user record');
  }

  return createUserResponse;
};
