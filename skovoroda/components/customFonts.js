import { Global } from '@mantine/core';

export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Irmologion ieUcs',
            src: `url('IrmIEUcs.woff2') format("woff2")`,
            fontWeight: 500,
            fontStyle: 'normal',
          },
        },
      ]}
    />
  );
}