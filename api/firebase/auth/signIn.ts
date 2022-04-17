import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { SignInResult } from '../types';

export const signIn = (
  email: string,
  password: string
): Promise<SignInResult> =>
  signInWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      console.log('signIn: ', credentials);
      const user = credentials.user;
      return [user, null] as SignInResult;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('signIn: ', errorCode, errorMessage);

      return [null, error.message] as SignInResult;
    });
