import '../styles/globals.css'
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { CustomFonts } from '../components/customFonts';
import { SkovorodaConstants } from '../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import Script from 'next/script';

const SkHeaderMenuDesktop = dynamic(() => import('../components/shared/skHeaderMenuDesktop'));
const SkHeaderMenuMobile = dynamic(() => import('../components/shared/skHeaderMenuMobile'));

const SkFooterDesktop = dynamic(() => import('../components/shared/skFooterDesktop'));
const SkFooterMobile = dynamic(() => import('../components/shared/skFooterMobile'));

import { Roboto } from '@next/font/google'
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ["cyrillic", "latin", "greek"],
})


export default function App(props) {

  const { Component, pageProps } = props;

  let deviceEnding = pageProps.deviceEnding;
  if (!deviceEnding) {
    deviceEnding = props.router.route.includes(SkovorodaConstants.desktopEnding) 
      ? SkovorodaConstants.desktopEnding 
      : SkovorodaConstants.mobileEnding;
  }
  const isMobile = deviceEnding === SkovorodaConstants.mobileEnding;
  const isDektop = !isMobile;
  
  if (!pageProps.metadataTitle) {
    console.warn(`You forgot to implement metadata title for current page ${pageProps.pageKey}`);
  }
  if (!pageProps.metadataDescription) {
    console.warn(`You forgot to implement metadata title for current page ${pageProps.pageKey}`);
  }

  // const searchAutocompleteArray = [
  //   SkovorodaTranslatorsArray.map(translator => translator.fullName),
  //   SkovorodaSourcesArray.map(source => source.sourceName),
  // ].flatMap(x => x);

  // "Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JL0EM7690R"/>
      <Script id="gtagScript">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JL0EM7690R');
      `}</Script>
      <Head>
        <title>{pageProps.metadataTitle}</title>
        <meta name="description" content={pageProps.metadataDescription} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        
        {pageProps.shouldBeIndexed ? null :
          <meta name="robots" content="noindex, nofollow" />}
       
        {(pageProps.metadataKeywords && pageProps.metadataKeywords.length) ? 
          <meta name="keywords" content={pageProps.metadataKeywords.join(",")} /> : null}
       
        {(pageProps.metadataAuthorUrl ? 
          <link rel="author" href={pageProps.metadataAuthorUrl} /> : null)}
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: "Roboto,Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji", 
          fontStyle: "normal",
          headings: {
            fontFamily: "Roboto,Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
          },
          shadows: {
            sm: '3px 4px 8px 1px rgba(0, 0, 0, 0.15)',
            md: '2px 2px 12px rgba(0, 0, 0, 0.15)',
            lg: '4px 7px 20px rgba(0, 0, 0, 0.25)',
          },
          fontSizes: {
            xs: "12px",
            sm: "16px",
            md: "20px",
            lg: "24px",
            xl: "28px"
          },
          radius: {
            md: "12px",
          },
          spacing: {
            xs: "6px",
            sm: "12px",
            md: "24px",
            lg: "36px",
            xl: "48px",
          },
          colors: {},
          globalStyles: (theme) => ({
            body: {
              backgroundColor: "white",
              fontWeight: "400",
              fontSize: "20px",
              letterSpacing: "-0.06px",
              textRendering: "optimizelegibility",
              position: "relative",
              minHeight: "100vh",
              width: "100vw",
            },
            "body::after": {
              content: '""',
              display: "block",
              height: "120px", /* Set same as footer's height */
            },
            ".normalContentText": {
              fontWeight: 300,
              fontSize: "20px",
              lineHeight: "23px",
              textAlign: "left",
              letterSpacing: "0.03em",
              textIndent: "24px",
            },
            ".normalContentText_justify": {
              textAlign: "justify",
            },
            ".normalContentText_center": {
              textAlign: "center",
              textIndent: 0,
            },
            ".normalContentText_withoutIndent": {
              textIndent: 0,
            },
            ".normalContentText_withoutFirstIndent:first-of-type": {
              textIndent: 0,
            },
            ".mantine-Select-item": {
              fontWeight: 300,
              fontSize: isMobile ? "12px" : "20px",
              lineHeight: isMobile ? "14px" : "23px",
              letterSpacing: isMobile ? "0" : "0.04em",
              padding: "10px 12px",
            },
            ".st0": {
              fill: theme.colors.blue[2]
            },
            ".st1": {
              fill: theme.colors.orange[2]
            },
            ".st2": {
              fill: theme.colors.orange[9]
            },
            ".st3": {
              fill: theme.colors.blue[4]
            },
            ".st4": {
              fill: theme.colors.blue[4]
            },
            ".grayForText": {
              color: theme.colors.gray[9],
            },
            ".undecoratedLink": {
              textDecoration: "none",

              ":hover": {
                color: theme.colors.blue[5]
              }
            },
            ".blackLink": {
              color: "black",
            },
            "button:focus": {
              outline: 'none !important',
              borderColor: 'transparent !important',
              boxShadow: theme.shadows.xs,
            },
            "input:focus": {
              outline: 'none !important',
              borderColor: 'transparent !important',
              boxShadow: theme.shadows.xs,
            },
            ".fontFamilyOldUa": {
              fontFamily: "Pelagy, Yermak",
            },
            ".bigH1": {
              fontSize: "40px",
            },
            ".specialBorder": {
              borderWidth: "2px",
              borderColor: theme.colors.blue[0],
            },
            ".textOverflow": {
              textOverflow: "ellipsis",
              overflowX: "hidden",
            },
            ".mantine-Input-input": {
              textOverflow: "ellipsis",
              overflowX: "hidden",
            },
            ".mantine-List-itemWrapper": {
              textOverflow: "ellipsis",
              overflowX: "hidden",
              width: "calc(100% - 20px)",
            },
          }),
        }}
      >
        <CustomFonts />
        
        <main className={roboto.className}>

          {isDektop ? 
            <SkHeaderMenuDesktop /> : 
            <SkHeaderMenuMobile />}
          
          <Component {...pageProps} />

          {isDektop ? 
            <SkFooterDesktop /> : 
            <SkFooterMobile />}

        </main>

      </MantineProvider>
    </>
  );
}
