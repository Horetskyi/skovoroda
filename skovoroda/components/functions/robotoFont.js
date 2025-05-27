
import { Roboto } from 'next/font/google'
export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700'],
  subsets: ["cyrillic", "latin", "greek"],
});
export const readableFontClassName = roboto.className; 