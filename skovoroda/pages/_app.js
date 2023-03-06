import '../styles/globals.css'
import Head from 'next/head';
import { Container, MantineProvider } from '@mantine/core';
import { HeaderSearch } from '../components/headerSearch';
import { SkovorodaTranslatorsArray } from '../lib/data/skovorodaTranslators';
import { SkovorodaSourcesArray } from '../lib/data/skovorodaSources';
import { CustomFonts } from '../components/customFonts';
import { pathWithoutEndSlash, SkovorodaBioPath, SkovorodaLettersPath, SkovorodaTextsPath } from '../lib/skovorodaPath';
import dynamic from 'next/dynamic';
import { homePageKey, SkovorodaConstants } from '../lib/skovorodaConstants';
const SkovorodaBreadcrumbsDesktop = dynamic(() => import('../components/skovorodaBreadcrumbsDesktop'));
const SkovorodaBreadcrumbsMobile = dynamic(() => import('../components/skovorodaBreadcrumbsMobile'));

const HEADER_MENU_LINKS = [
  {
    "link": pathWithoutEndSlash(SkovorodaBioPath),
    "label": "Біографія"
  },
  {
    "link": pathWithoutEndSlash(SkovorodaTextsPath),
    "label": "Твори"
  },
  {
    "link": pathWithoutEndSlash(SkovorodaLettersPath),
    "label": "Листи"
  },
];

export default function App(props) {

  const { Component, pageProps } = props;

  const isHomePage = pageProps.pageKey && pageProps.pageKey.pageKey === homePageKey.pageKey; // props.router && (props.router.asPath === "/");

  let deviceEnding = pageProps.deviceEnding;
  if (!deviceEnding) {
    deviceEnding = props.router.route.includes(SkovorodaConstants.desktopEnding) 
      ? SkovorodaConstants.desktopEnding 
      : SkovorodaConstants.mobileEnding;
  }
  
  if (!pageProps.metadataTitle) {
    console.warn(`You forgot to implement metadata title for current page`);
  }
  if (!pageProps.metadataDescription) {
    console.warn(`You forgot to implement metadata title for current page`);
  }

  const searchAutocompleteArray = [
    SkovorodaTranslatorsArray.map(translator => translator.fullName),
    SkovorodaSourcesArray.map(source => source.sourceName),
  ].flatMap(x => x);

  return (
    <>
      <Head>
        <title>{pageProps.metadataTitle}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content={pageProps.metadataDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: "Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
          // shadows: {
          //   xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
          //   sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
          //   md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.10) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
          //   lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
          //   xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
          // },
          fontSizes: {
            xs: "12px",
            sm: "16px",
            md: "20px",
            lg: "24px",
            xl: "28px"
          },
          colors: {},
          globalStyles: (theme) => ({
            body: {
              backgroundColor: "white",
              fontWeight: "400",
              letterSpacing: "-0.06px",
              textRendering: "optimizelegibility",
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
            }
          }),
        }}
      >
        <CustomFonts />
        <HeaderSearch links={HEADER_MENU_LINKS} searchAutocompleteArray={searchAutocompleteArray}/>

        { isHomePage ? <></> : <>
          <Container>
            { 
              deviceEnding === SkovorodaConstants.desktopEnding 
              ? <SkovorodaBreadcrumbsDesktop {...pageProps} />
              : <SkovorodaBreadcrumbsMobile {...pageProps} />
            }
          </Container>
        </>}
        
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
