import '../styles/globals.css'
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Test 1 Page Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
          shadows: {
            xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
            sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
            md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.10) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
            lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
            xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
          },
          globalStyles: (theme) => ({
            body: {
              backgroundColor: theme.colors.gray[0]
            }
          }),
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}