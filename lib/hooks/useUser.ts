import { auth } from 'api';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return user;
};
