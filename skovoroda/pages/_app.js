import '../styles/globals.css'
import Head from 'next/head';
import { Anchor, Breadcrumbs, Container, createStyles, MantineProvider } from '@mantine/core';
import { HeaderSearch } from '../components/headerSearch';
import { SkovorodaTranslatorsArray } from '../lib/data/skovorodaTranslators';
import { SkovorodaSourcesArray } from '../lib/data/skovorodaSources';
import { CustomFonts } from '../components/customFonts';
import { pathJoinWithoutEndSlash, pathWithoutEndSlash, SkovorodaBioPath, SkovorodaGardenPath, SkovorodaHomePath, SkovorodaLettersFromPath, SkovorodaLettersPath, SkovorodaLettersToPath, SkovorodaTextsPath, SkovorodaTreatisePath } from '../lib/skovorodaPath';
import { gardenPageKey, gardenSelectedPageKey, homePageKey, lettersFromPageKey, lettersPageKey, lettersToPageKey, textsPageKey, treatisePageKey, treatiseSelectedPageKey } from '../lib/skovorodaConstants';
import Link from 'next/link';

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

const useStyles = createStyles((theme) => ({
  breadcrumbs: {
    flexWrap: "wrap",
    gap: theme.spacing.sm,

    "div": {
      margin: 0,
    }
  }
}));

const breadcrumbsHrefsMap = new Map([
  [homePageKey.pageKey, SkovorodaHomePath],
  [textsPageKey.pageKey, SkovorodaTextsPath],
  [treatisePageKey.pageKey, SkovorodaTreatisePath],
  [treatiseSelectedPageKey.pageKey, SkovorodaTreatisePath],
  [gardenPageKey.pageKey, SkovorodaGardenPath],
  [gardenSelectedPageKey.pageKey, SkovorodaGardenPath],
  [lettersPageKey.pageKey, SkovorodaLettersPath],
  [lettersFromPageKey.pageKey, SkovorodaLettersFromPath],
  [lettersToPageKey.pageKey, SkovorodaLettersToPath],
]);

const breadcrumbsLabelsMap = new Map([
  [homePageKey.pageKey, "Головна сторінка"],
  [treatisePageKey.pageKey, "Трактати, Діалоги, Притчі"],
  [textsPageKey.pageKey, "Твори"],
  [gardenPageKey.pageKey, "Сад божественних пісень"],
  [lettersPageKey.pageKey, "Листи"],
]);

function getBreadcrumbLabel(pageKey) {
  const breadcrumLabel = breadcrumbsLabelsMap.get(pageKey);
  if (!breadcrumLabel) {
    throw new Error(`You forgot to implement breadcrumb LABEL for page with key: ${pageKey}`);
  } 
  return breadcrumLabel;
} 

function getBreadcrumbs(pageProps) {
  const breadcrumbs = [];
  let currentPageKey = pageProps.pageKey;
  while (currentPageKey) {

    const breadcrumHref = breadcrumbsHrefsMap.get(currentPageKey.pageKey);
    if (!breadcrumHref) {
      throw new Error(`You forgot to implement breadcrumb HREF for page with key: ${currentPageKey.pageKey}`);
    } 

    const breadcrumb = { 
      title: pageProps.breadcrumbLabel && !breadcrumbs.length
        ? pageProps.breadcrumbLabel
        : getBreadcrumbLabel(currentPageKey.pageKey), 
      href: pageProps.selectedId && !breadcrumbs.length
        ? pathJoinWithoutEndSlash(breadcrumHref, pageProps.selectedId)
        : breadcrumHref
    };
    breadcrumbs.push(breadcrumb);
    currentPageKey = currentPageKey.parent;
    continue;
  }
  breadcrumbs.reverse();
  return breadcrumbs;
}

export default function App(props) {

  const { classes } = useStyles();
  const { Component, pageProps } = props;
  
  if (!pageProps.metadataTitle) {
    throw new Error(`You forgot to implement metadata title for current page`);
  }
  if (!pageProps.metadataDescription) {
    throw new Error(`You forgot to implement metadata title for current page`);
  }

  const searchAutocompleteArray = [
    SkovorodaTranslatorsArray.map(translator => translator.fullName),
    SkovorodaSourcesArray.map(source => source.sourceName),
  ].flatMap(x => x);

  const breadcrumbs = getBreadcrumbs(pageProps);
  const breadcrumbsElements = breadcrumbs.map((item, index) => (
    <Link href={item.href} key={index}>{item.title}</Link>
  ));

  return (
    <>
      <Head>
        <title>{pageProps.metadataTitle}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content={pageProps.metadataDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          fontFamily: "Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
          shadows: {
            xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
            sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
            md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.10) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
            lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
            xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
          },
          fontSizes: {
            xs: "12px",
            sm: "16px",
            md: "20px",
            lg: "24px",
            xl: "28px"
          },
          colors: {
            'green': [
              '#FCFDFB', '#F5F7EF', '#EEF1E4', '#E5EAD6', '#DDE4C9', 
              '#CCD6AE', '#C3CFA0', '#BBC892', '#B2C185', '#AABB77'
            ],
            'pink': [
              '#FEF5FC', '#FDECFA', '#FBDAF4', '#F9C7EF', '#F8B5E9',
              '#F6A2E4', '#F490DE', '#F27DD9', '#F06AD3', '#EE58CE'
            ],
            'lilac': [
              '#F6F5FC', '#F1EFFA', '#E3E0F6', '#D5D0F1', '#C7C0EC',
              '#B9B0E8', '#ABA1E3', '#9D91DE', '#8F81D9', '#8072D5'
            ],
            'magnolia': [
              '#FCF5F8', '#FAEFF4', '#F6E0E9', '#F1D0DE', '#ECC0D3',
              '#E8B0C8', '#E3A1BD', '#DE91B2', '#D981A8', '#D5729D'
            ],
            'orange': [
              '#FFF8EF', '#FFF6EA', '#FFEDD6', '#FFE4C2', '#FFDCAD', 
              '#FFCA85', '#FFC170', '#FFB85C', '#FFAF47', '#FFA733'
            ],
            'gray': [
              '#F7F6F5', '#EDEBE8', '#E4E0DD', '#DBD6D2', '#D2CCC6', 
              '#9B8F82', '#4A4A45', '#40403B', '#353531', '#2A2A27'
            ],
          },
          globalStyles: (theme) => ({
            body: {
              backgroundColor: "white",
              fontWeight: "400",
              letterSpacing: "-0.06px",
              textRendering: "optimizelegibility",
            },
            ".grayForText": {
              color: theme.colors.gray[9],
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
          }),
        }}
      >
        <CustomFonts />
        <HeaderSearch links={HEADER_MENU_LINKS} searchAutocompleteArray={searchAutocompleteArray}/>
        <Container>
          <Breadcrumbs separator=">" mb="lg" className={classes.breadcrumbs}>{breadcrumbsElements}</Breadcrumbs>
        </Container>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
