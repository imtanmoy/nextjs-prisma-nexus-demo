import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';
import GlobalStyle from '../components/GlobalStyle';
import { useApollo } from '../graphql/client';

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo({
    initialState: pageProps.initialApolloState,
  });
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
