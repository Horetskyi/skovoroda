import '../styles/globals.css'
import Head from 'next/head';
import { Anchor, Breadcrumbs, MantineProvider } from '@mantine/core';
import getSkovorodaData from '../lib/skovorodaData';
import { HeaderSearch } from '../components/headerSearch';

export default function App(props) {
  const { Component, pageProps } = props;

  const skovorodaData = getSkovorodaData();
  const searchAutocompleteArray = [
    skovorodaData.translators.map(translator => translator.fullName),
    skovorodaData.sources.map(source => source.sourceName),
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

  const breadcrumbs1 = [
    { title: 'Головна сторінка', href: '/' },
  ];

  console.log(pageProps);

  if (pageProps.textData) {
    breadcrumbs1.push({ title: 'Тексти', href: '/texts' });
    if (pageProps.textData.id) {
      breadcrumbs1.push({ title: pageProps.textData.original.originalName, href: '/' });
    }
  }
  
  const breadcrumbs = breadcrumbs1.map((item, index) => (
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
          globalStyles: (theme) => ({
            body: {
              backgroundColor: theme.colors.gray[0]
            },
            ".gray8": {
              color: theme.colors.gray[8],
            }
          }),
        }}
      >
        <HeaderSearch links={links} searchAutocompleteArray={searchAutocompleteArray}/>
        <Breadcrumbs separator="→">{breadcrumbs}</Breadcrumbs>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}