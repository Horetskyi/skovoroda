import '../styles/globals.css'
import Head from 'next/head';
import { Anchor, Breadcrumbs, Container, Group, MantineProvider } from '@mantine/core';
import { HeaderSearch } from '../components/headerSearch';
import { SkovorodaTranslatorsArray } from '../lib/data/skovorodaTranslators';
import { SkovorodaSourcesArray } from '../lib/data/skovorodaSources';
import { CustomFonts } from '../components/customFonts';
import { getTranslationId } from '../lib/sadIds';
import { pathJoinWithoutEndSlash, pathWithoutEndSlash, SkovorodaSadPath, SkovorodaTextsPath } from '../lib/skovorodaPath';



export default function App(props) {
  const { Component, pageProps } = props;

  const searchAutocompleteArray = [
    SkovorodaTranslatorsArray.map(translator => translator.fullName),
    SkovorodaSourcesArray.map(source => source.sourceName),
  ].flatMap(x => x);

  const textsLabel = "Твори";
  const sadPath = SkovorodaSadPath;
  const textsPath = SkovorodaTextsPath;
  
  const links = [
    {
      "link": "/bio",
      "label": "Біографія"
    },
    {
      "link": pathWithoutEndSlash(textsPath),
      "label": textsLabel
    },
    {
      "link": "/lysty",
      "label": "Листи"
    },
    {
      "link": "/doslidzennya",
      "label": "Дослідження"
    }
  ];
  const breadcrumbs = [
    { title: 'Головна сторінка', href: '/' },
  ];
  const breadcrumbTexts = { title: textsLabel, href: pathWithoutEndSlash(textsPath) };

  if (pageProps.textsData) {
    breadcrumbs.push(breadcrumbTexts);
  }
  else if (pageProps.textData) {
    breadcrumbs.push(breadcrumbTexts);
    if (pageProps.textData.id) {
      breadcrumbs.push({ 
        title: pageProps.textData.original.originalName, 
        href: textsPath + pageProps.textData.id
      });
    }
  }
  else if (pageProps.sadData) {
    const onFlySelectedId = props.router._inFlightRoute ? props.router._inFlightRoute.replace(SkovorodaSadPath, "") : pageProps.selectedId;
    const translationId = getTranslationId(onFlySelectedId);
    breadcrumbs.push(breadcrumbTexts);
    breadcrumbs.push({ 
      title: translationId ? 'Сад божественних пісень' : 'Сад божественных пѣсней', 
      href: pathWithoutEndSlash(sadPath) 
    });
    breadcrumbs.push({ 
      title: translationId ? pageProps.sadData.translates.find(t => t.translationId === translationId).name : pageProps.sadData.originalName, 
      href: pathJoinWithoutEndSlash(sadPath, onFlySelectedId)
    });
  }
  
  const breadcrumbsElement = breadcrumbs.map((item, index) => (
    <Anchor href={item.href} key={index}>{item.title}</Anchor>
  ));

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
              '#9B8F82', '#928577', '#887A6D', '#7D7064', '#71665B'
            ],
          },
          globalStyles: (theme) => ({
            body: {
              backgroundColor: "white"
            },
            ".grayForText": {
              color: theme.colors.gray[9],
            },
            "button:focus": {
              outline: 'none !important',
              border: 'none',
              boxShadow: theme.shadows.xs,
            },
            "input:focus": {
              outline: 'none !important',
              border: 'none',
              boxShadow: theme.shadows.xs,
            },
          }),
        }}
      >
        <CustomFonts />
        <HeaderSearch links={links} searchAutocompleteArray={searchAutocompleteArray}/>
        <Container>
            <Breadcrumbs separator=">" mb="lg">{breadcrumbsElement}</Breadcrumbs>
        </Container>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}