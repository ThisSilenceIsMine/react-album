import { Box, ChakraProvider } from '@chakra-ui/react';
import { RouteGuard } from 'components/RouteGuard';
import { AppProps } from 'next/app';
import '../public/style.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Box>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </Box>
    </ChakraProvider>
  );
};

export default MyApp;
