import { auth } from 'api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  children: JSX.Element;
};

export const RouteGuard = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user && !router.pathname.startsWith('/auth')) {
        router.push('/auth/login');
      }
    });
  }, [router]);

  return <>{children}</>;
};
