import { Box, ChakraProvider } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { RouteGuard } from 'components/RouteGuard';
import theme from 'lib/theme';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../public/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const isOnAuth = router.pathname.startsWith('/auth');

  useEffect(() => {
    console.log(localStorage.getItem('chakra-ui-color-mode'));
    (function () {
      try {
        var mode = localStorage.getItem('chakra-ui-color-mode');
        if (!mode) return;
        document.documentElement.style.setProperty(
          '--chakra-ui-color-mode',
          mode
        );
      } catch (e) {}
    })();
  }, []);

  return (
    <ChakraProvider resetCSS theme={theme}>
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
