import { ChakraProvider } from '@chakra-ui/react';
import { App } from './src/App';
import * as React from 'react';

/**
 * Home page for the web app.
 */
export default function Home() {
  return (
    <ChakraProvider>
      <App/>
    </ChakraProvider>
  );
}
