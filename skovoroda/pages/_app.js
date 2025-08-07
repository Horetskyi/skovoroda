import Head from 'next/head';
import { MantineProvider, createTheme } from '@mantine/core';
import { SkovorodaConstants } from '../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import '@mantine/core/styles.layer.css';
import './app.styles.scss';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useState, useEffect } from 'react';

const SkHeaderMenuDesktop = dynamic(() => import('../components/shared/skHeaderMenuDesktop'));
const SkHeaderMenuMobile = dynamic(() => import('../components/shared/skHeaderMenuMobile'));

const SkFooterDesktop = dynamic(() => import('../components/shared/skFooterDesktop'));
const SkFooterMobile = dynamic(() => import('../components/shared/skFooterMobile'));

export default function App(props) {

  const { Component, pageProps } = props;

  let deviceEnding = pageProps.deviceEnding;
  if (!deviceEnding) {
    deviceEnding = props.router.route.includes(SkovorodaConstants.desktopEnding) 
      ? SkovorodaConstants.desktopEnding 
      : SkovorodaConstants.mobileEnding;
  }
  
  // Initial mobile state based on SSR logic
  const initialMobile = deviceEnding === SkovorodaConstants.mobileEnding;
  const [shouldUseMobile, setShouldUseMobile] = useState(initialMobile);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag to true after hydration
    setIsClient(true);
    
    const checkScreenWidth = () => {
      const isMobileWidth = window.innerWidth < 1190;
      setShouldUseMobile(isMobileWidth || deviceEnding === SkovorodaConstants.mobileEnding);
    };

    // Check screen width on mount
    checkScreenWidth();

    // Add resize listener
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup listener
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, [deviceEnding]);

  // During SSR or before client hydration, use original SSR logic
  const isMobile = isClient ? shouldUseMobile : initialMobile;
  const isDektop = !isMobile;
  
  if (!pageProps.metadataTitle) {
    console.warn(`You forgot to implement metadata title for current page ${pageProps.pageKey}`);
  }
  if (!pageProps.metadataDescription) {
    console.warn(`You forgot to implement metadata title for current page ${pageProps.pageKey}`);
  }
  
  const theme = createTheme({
    colorScheme: 'light',
    fontFamily: "Arsenal SC", 
    fontStyle: "normal",
    headings: {
      fontFamily: "Arsenal SC",
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
    breakpoints: {
      sm: '900px',
    },
  });

  return (
    <>
      {/* <Script src="https://plugin-api-4.nytroseo.com/api/site/c9f32217-5c9a-49d3-aa3a-9e912cb4f07c/nytroseo.min.js" /> */}
      {/* <Script type="text/javascript" src="data:text/javascript;base64,
LyogQWxsaSBBSSB3aWRnZXQgZm9yIHd3dy5za292b3JvZGEuY2x1YiAqLwooZnVuY3Rpb24gKHcsZCxzLG8sZixqcyxmanMpIHt3WydBbGxpSlNXaWRnZXQnXT1vO3dbb10gPSB3W29dIHx8IGZ1bmN0aW9uICgpIHsgKHdbb10ucSA9IHdbb10ucSB8fCBbXSkucHVzaChhcmd1bWVudHMpIH07anMgPSBkLmNyZWF0ZUVsZW1lbnQocyksIGZqcyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUocylbMF07anMuaWQgPSBvOyBqcy5zcmMgPSBmOyBqcy5hc3luYyA9IDE7IGZqcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShqcywgZmpzKTt9KHdpbmRvdywgZG9jdW1lbnQsICdzY3JpcHQnLCAnYWxsaScsICdodHRwczovL3N0YXRpYy5hbGxpYWkuY29tL3dpZGdldC92MS5qcycpKTthbGxpKCdpbml0JywgJ3NpdGVfZFhVV3BncGlvWVhlVm1rOCcpO2FsbGkoJ29wdGltaXplJywgJ2FsbCcpOw==" /> */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JL0EM7690R" strategy='lazyOnload'/>
      <Script id="gtagScript" strategy='lazyOnload'>{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JL0EM7690R');
      `}</Script>
      <Head>
        <title>{pageProps.metadataTitle}</title>
        <meta name="description" content={pageProps.metadataDescription} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        
        {/* Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <meta name="apple-mobile-web-app-title" content="Skovoroda Club" />
        <meta name="msapplication-TileColor" content="#3D5270" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="manifest" href="/manifest.json" />
        
        {pageProps.shouldBeIndexed 
          ? <meta name="robots" content="index, follow" /> 
          : <meta name="robots" content="noindex, nofollow" />}
       
        {(pageProps.metadataKeywords && pageProps.metadataKeywords.length) ? 
          <meta name="keywords" content={pageProps.metadataKeywords.join(", ")} /> : null}
       
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

        <meta name="publisher" content="https://www.skovoroda.club/"></meta>

      </Head>
      <MantineProvider theme={theme}>
        
        <SpeedInsights />

        {isDektop ? 
          <SkHeaderMenuDesktop /> : 
          <SkHeaderMenuMobile />}

        {/* <main className={roboto.className}> */}
        <main>
          <Component {...pageProps} isMobile={isMobile} />
        </main>

        {isDektop ? 
          <SkFooterDesktop /> : 
          <SkFooterMobile />}

      </MantineProvider>
    </>
  );
}
