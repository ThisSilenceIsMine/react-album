import { User } from 'firebase/auth';
import md5 from 'md5';

export const getAvatar = (user: User) => {
  if (user.photoURL) {
    return user.photoURL;
  }
  if (user.email) {
    return `https://www.gravatar.com/avatar/${md5(user.email)}?d=identicon`;
  }
  return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon';
};
