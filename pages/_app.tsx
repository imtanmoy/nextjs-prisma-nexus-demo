import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import "antd/dist/antd.css";
import { useApollo } from "../src/lib/apollo";
import GlobalStyle from "../components/GlobalStyle";

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
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
}
