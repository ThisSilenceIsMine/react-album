import { Box, ChakraProvider } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { RouteGuard } from 'components/RouteGuard';
import theme from 'lib/theme';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../public/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
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
      <Header />
      <RouteGuard>
        <Box height={'calc(100% - 56px)'}>
          <Component {...pageProps} />
        </Box>
      </RouteGuard>
    </ChakraProvider>
  );
};

export default MyApp;
