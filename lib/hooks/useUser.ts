import { auth } from 'api';
import { User } from 'firebase/auth';
import { useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return user;
};
