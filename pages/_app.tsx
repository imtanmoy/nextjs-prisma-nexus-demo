import React from "react";
import {AppProps} from 'next/app';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import 'antd/dist/antd.css'

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }
      
      html,
      body,
      #root {
        height: 100%;
      }
      .colorWeak {
        filter: invert(80%);
      }
      .ant-layout {
        min-height: 100vh;
      }
      canvas {
        display: block;
      }
      body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      ul,
      ol {
        list-style: none;
      } 
`

const theme = {
    colors: {
        primary: '#0070f3',
    },
}

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalStyle/>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
