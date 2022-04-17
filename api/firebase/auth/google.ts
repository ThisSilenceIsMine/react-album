import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  login_hint: 'user@example.com',
});

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential?.accessToken;

      const user = result.user;

      return { credential, token, user };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return { errorCode, errorMessage };
    });
