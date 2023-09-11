import { readAllFables } from "../lib/dataReaders/fablesReader";
import * as sp from "../lib/skovorodaPath";

function generateSiteMap() {
  
  const baseUrl = "https://www.skovoroda.club/";
  const pageUrls = [
    baseUrl,
    sp.pathJoin(baseUrl, sp.SkovorodaAboutUsPath),
    sp.pathJoin(baseUrl, sp.SkovorodaContactPath),
    sp.pathJoin(baseUrl, sp.SkovorodaCopyrightPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaBioPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaQuotesPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaSymbolsPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaUtils1Path),
    // sp.pathJoin(baseUrl, sp.SkovorodaTextsPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaTreatisePath),
    // sp.pathJoin(baseUrl, sp.SkovorodaGardenPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaOtherPoemsPath),
    sp.pathJoin(baseUrl, sp.SkovorodaFablesPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaTranslatationsPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaDifferentPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaLettersPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaLettersFromPath),
    // sp.pathJoin(baseUrl, sp.SkovorodaLettersToPath),
  ];

  // Fables
  const { allFables } = readAllFables();
  const allFablesUrlIds = allFables.map(fable => fable.metadata.urlId);
  allFablesUrlIds.map(urlId => sp.pathJoin(baseUrl, sp.SkovorodaFablesPath, urlId)).forEach(url => pageUrls.push(url));

  const pagesUrlsXml = pageUrls.map(pageUrl => {
    return `<url>
      <loc>${pageUrl}</loc>
    </url>`
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pagesUrlsXml}
   </urlset>
`;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap();
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
}

export default SiteMap;