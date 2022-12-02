import Link from 'next/link';
import { SkovorodaSad } from '../lib/data/skovorodaSad';
import { SkovorodaTextsArray } from '../lib/data/skovorodaTexts';

export default function SkovorodaTextsPageDesktop({ textsData, sadData }) {
  
  return <>
    <h1>Texts</h1>

    <h2>{sadData.originalName}</h2>
    {sadData.array.map((data, index) => {
      return <Link key={index} href={"/sad/" + data.id}>{data.originalName}</Link>
    })}

    {textsData.map((textData, index) => {
      return <Link key={index} href={"/texts/" + textData.id}>{textData.original.originalName}</Link>
    })}
  </>
}

export async function getStaticProps({ params }) {

  return {
    props: {
      textsData: SkovorodaTextsArray,
      sadData: await SkovorodaSad(),
    },
  };
}