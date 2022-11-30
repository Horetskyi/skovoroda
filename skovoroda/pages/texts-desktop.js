import Link from 'next/link';
import { SkovorodaTextsArray } from '../lib/data/skovorodaTexts';

export default function SkovorodaTextsPageDesktop({ textsData }) {
  
  return <>
    <h1>Texts</h1>

    {textsData.map((textData, index) => {
      return <Link key={index} href={"/texts/" + textData.id}>{textData.original.originalName}</Link>
    })}
  </>
}

export async function getStaticProps({ params }) {

  const textsData = SkovorodaTextsArray;
  return {
    props: {
      textsData
    },
  };
}