import { Global } from '@mantine/core';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Irmologion ieUcs',
            src: `url('/IrmIEUcs.woff2') format("woff2")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
        // {
        //   '@font-face': {
        //     fontFamily: 'Yermak',
        //     src: `url('/Yermak.woff2') format("woff2")`,
        //     fontWeight: 500,
        //     fontStyle: 'normal',
        //   },
        // },
        // {
        //   '@font-face': {
        //     fontFamily: 'Preciosa',
        //     src: `url('/Preciosa.woff2') format("woff2")`,
        //     fontWeight: 500,
        //     fontStyle: 'normal',
        //   },
        // }, 
        // {
        //   '@font-face': {
        //     fontFamily: 'Pelagy',
        //     src: `url('/Pelagy.woff2') format("woff2")`,
        //     fontWeight: 500,
        //     fontStyle: 'normal',
        //   },
        // },
      ]}
    />
  );
}