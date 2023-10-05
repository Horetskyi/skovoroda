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
      {/* <Script src="https://plugin-api-4.nytroseo.com/api/site/c9f32217-5c9a-49d3-aa3a-9e912cb4f07c/nytroseo.min.js" /> */}
      {/* <Script type="text/javascript" src="data:text/javascript;base64,
LyogQWxsaSBBSSB3aWRnZXQgZm9yIHd3dy5za292b3JvZGEuY2x1YiAqLwooZnVuY3Rpb24gKHcsZCxzLG8sZixqcyxmanMpIHt3WydBbGxpSlNXaWRnZXQnXT1vO3dbb10gPSB3W29dIHx8IGZ1bmN0aW9uICgpIHsgKHdbb10ucSA9IHdbb10ucSB8fCBbXSkucHVzaChhcmd1bWVudHMpIH07anMgPSBkLmNyZWF0ZUVsZW1lbnQocyksIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07anMuaWQgPSBvOyBqcy5zcmMgPSBmOyBqcy5hc3luYyA9IDE7IGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTt9KHdpbmRvdywgZG9jdW1lbnQsICdzY3JpcHQnLCAnYWxsaScsICdodHRwczovL3N0YXRpYy5hbGxpYWkuY29tL3dpZGdldC92MS5qcycpKTthbGxpKCdpbml0JywgJ3NpdGVfZFhVV3BncGlvWVhlVm1rOCcpO2FsbGkoJ29wdGltaXplJywgJ2FsbCcpOw==" /> */}
      <Head>
        <title>{pageProps.metadataTitle}</title>
        <meta name="description" content={pageProps.metadataDescription} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.png" />
        
        {pageProps.shouldBeIndexed ? null :
          <meta name="robots" content="noindex, nofollow" />}
       
        {(pageProps.metadataKeywords && pageProps.metadataKeywords.length) ? 
          <meta name="keywords" content={pageProps.metadataKeywords.join(",")} /> : null}
       
        {(pageProps.metadataAuthorUrl ? 
          <link rel="author" href={pageProps.metadataAuthorUrl} /> : null)}

        {(pageProps.canonicalPageUrl ?
          <link rel="canonical" href={pageProps.canonicalPageUrl} /> : null)}

        {(pageProps.canonicalPageUrl ?
          <meta property="og:url" content={pageProps.canonicalPageUrl} /> : null)}

        {(pageProps.metadataTitle ?
          <meta property="og:title" content={pageProps.metadataTitle} /> : null)}

        {(pageProps.metadataDescription ?
          <meta property="og:description" content={pageProps.metadataDescription} /> : null)}

        {(pageProps.facebookImageUrl ?
          <meta property="og:image" content={pageProps.facebookImageUrl} /> : null)}

      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: roboto.style.fontFamily, 
          fontStyle: "normal",
          headings: {
            fontFamily: roboto.style.fontFamily,
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
              overflowX: "clip",
            },
            "body::after": {
              content: '""',
              display: "block",
              height: "120px", /* Set same as footer's height */
            },
            ".normalContentText, .normalContentText label": {
              fontWeight: 300,
              fontSize: isMobile ? "16px" : "20px",
              lineHeight: isMobile ? "22px" : "23px",
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
            ".normalContentText_withoutIndent, .normalContentText_withoutIndent label": {
              textIndent: 0,
            },
            ".normalContentText_withoutFirstIndent:first-of-type": {
              textIndent: 0,
            },
            ".mantine-Select-item": {
              fontWeight: 300,
              fontSize: isMobile ? "14px" : "20px",
              lineHeight: isMobile ? "16px" : "23px",
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
            ".mantine-Overlay-root.mantine-Modal-overlay": {
              background: "white",
              opacity: 0.7,
            },
            ".mantine-Modal-body": {
              width: "520px",
              position: "relative",
            }
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
