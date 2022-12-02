import '../styles/globals.css'
import Head from 'next/head';
import { Anchor, Breadcrumbs, MantineProvider } from '@mantine/core';
import { HeaderSearch } from '../components/headerSearch';
import { SkovorodaTranslatorsArray } from '../lib/data/skovorodaTranslators';
import { SkovorodaSourcesArray } from '../lib/data/skovorodaSources';

export default function App(props) {
  const { Component, pageProps } = props;

  const searchAutocompleteArray = [
    SkovorodaTranslatorsArray.map(translator => translator.fullName),
    SkovorodaSourcesArray.map(source => source.sourceName),
  ].flatMap(x => x);
  
  const links = [
    {
      "link": "/texts",
      "label": "Тексти"
    },
    {
      "link": "/bio",
      "label": "Біографія"
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
  const breadcrumbTexts = { title: 'Тексти', href: '/texts' };

  if (pageProps.textsData) {
    breadcrumbs.push(breadcrumbTexts);
  }
  else if (pageProps.textData) {
    breadcrumbs.push(breadcrumbTexts);
    if (pageProps.textData.id) {
      breadcrumbs.push({ 
        title: pageProps.textData.original.originalName, 
        href: '/texts/' + pageProps.textData.id
      });
    }
  }
  else if (pageProps.sadData) {
    breadcrumbs.push(breadcrumbTexts);
    breadcrumbs.push({ 
      title: pageProps.sadData.originalName, 
      href: '/sad/' + pageProps.sadData.id
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
            'green': ['#F5F7EF', '#EEF1E4', '#E5EAD6', '#DDE4C9', '#D4DDBB', '#CCD6AE', '#C3CFA0', '#BBC892', '#B2C185', '#AABB77'],
            'yellow': ['#FFF6EA', '#FFEDD6', '#FFE4C2', '#FFDCAD', '#FFD399', '#FFCA85', '#FFC170', '#FFB85C', '#FFAF47', '#FFA733'],
            'gray': [
              '#F7F6F5', '#EDEBE8', '#E4E0DD', '#DBD6D2', '#D2CCC6', 
              '#C9C2BB', '#BFB8B0', '#B6ADA4', '#ADA399', '#A4998E', 
              '#9B8F82', '#928577', '#887A6D', '#7D7064', '#71665B'],
          },
          globalStyles: (theme) => ({
            body: {
              backgroundColor: theme.colors.gray[0]
            },
            ".grayForText": {
              color: theme.colors.gray[13],
            }
          }),
        }}
      >
        <HeaderSearch links={links} searchAutocompleteArray={searchAutocompleteArray}/>
        <Breadcrumbs separator="→" mb="lg" ml="xl">{breadcrumbsElement}</Breadcrumbs>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}