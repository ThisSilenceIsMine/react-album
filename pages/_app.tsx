import { Box, ChakraProvider } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { RouteGuard } from 'components/RouteGuard';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../public/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isOnAuth = router.pathname.startsWith('/auth');

  return (
    <ChakraProvider>
      <Box>
        {/* {!isOnAuth && <Header />} */}
        <Header />
        <RouteGuard>
          <Box height={isOnAuth ? 'calc(100% - 40px)' : '100%'}>
            <Component {...pageProps} />
          </Box>
        </RouteGuard>
      </Box>
    </ChakraProvider>
  );
};

export default MyApp;
