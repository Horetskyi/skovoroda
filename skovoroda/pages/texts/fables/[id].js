
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { SkovorodaConstants, fableSelectedPageKey } from '../../../lib/skovorodaConstants';
import { readAllFables } from '../../../lib/dataReaders/fablesReader';
import { skTranslatorsV2 } from '../../../lib/data/skovorodaTranslators';
import getSelectedNoteNumbersByContent from '../../../lib/getSelectedNoteNumbersByContent';
import dynamic from 'next/dynamic';

const FablePageDesktop = dynamic(() => import('../../../components/pages/fablePageDesktop'));
const FablePageMobile = dynamic(() => import('../../../components/pages/fablePageMobile'));

export default function FablePage(params) 
{
  return <>
    {params.deviceEnding == SkovorodaConstants.desktopEnding ? 
      <FablePageDesktop {...params} /> :
      <FablePageMobile {...params} />}
  </>;
}

// Get all Fables Paths
export async function getStaticPaths() {
  
  const {allFables} = readAllFables();
  const allFablesUrlIds = allFables.map(fable => fable.metadata.urlId);
  // console.log("All Fables Url Ids:", allFablesUrlIds);
  return getStaticPathsCommon(allFablesUrlIds);
}

// Get Fable By Url Id
export async function getStaticProps({ params }) {
  
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  
  // Fables
  const {allFables, allNotes, allComments, allCommonMetadata} = readAllFables();
  const allFablesMetadata = allFables.map(fable => fable.metadata);
  allFablesMetadata.sort((a,b) => a.fableNumber - b.fableNumber);
  const selectedFable = allFables.find(fable => fable.metadata.urlId == id);
  
  // Source
  const selectedFableSource = SkovorodaSourcesArray.find(source => source.devNumber === selectedFable.metadata.sourceId);
  selectedFable.source = selectedFableSource;

  // Translator
  const selectedFableTranslator = skTranslatorsV2.find(translator => translator.translatorId === selectedFable.metadata.translatorId)
  selectedFable.translator = selectedFableTranslator;

  // Notes
  const selectedNoteNumbers = getSelectedNoteNumbersByContent(selectedFable.content).concat(getSelectedNoteNumbersByContent(selectedFable.powerContent));
  let selectedNotes = allNotes[selectedFable.metadata.notesId];
  if (selectedNotes && selectedNotes.length) {
    selectedNotes = selectedNotes.filter(note => selectedNoteNumbers.includes(note.noteNumber) ||
      note.fableNumber == selectedFable.metadata.fableNumber);
  }
  
  // Comment
  const selectedCommentObj = allComments.find(comment => comment.fableNumber === selectedFable.metadata.fableNumber);
  const selectedComment = selectedCommentObj ? selectedCommentObj.content : null;

  // Common Metadata
  let selectedCommonMetadata = allCommonMetadata.find(metadata => metadata.fableNumber === selectedFable.metadata.fableNumber);
  if (!selectedCommonMetadata) {
    selectedCommonMetadata = null;
  }
  

  const isOriginal = selectedFableTranslator.translatorId ? false : true;

  const recommendedDescriptionLength = SkovorodaConstants.recommendedMetaDescriptionLength;
  var metaDescription = (isOriginal ? "В оригіналі." : "Перекладач: " + selectedFableTranslator.lastName + " " + selectedFableTranslator.firstName + " " + selectedFableTranslator.byFatherName + ".");
  var contentIndex = 0;
  while (metaDescription.length < recommendedDescriptionLength && contentIndex < selectedFable.content.length) {
    const text = selectedFable.content[contentIndex].text;
    if (text.length + metaDescription.length <= recommendedDescriptionLength) {
      metaDescription += " " + text;
    } else {
      metaDescription += " " + text.substring(0, recommendedDescriptionLength - metaDescription.length) + "...";
      break;
    }
    contentIndex++;
  }

  const metaKeywords = [
    selectedFable.metadata.fableTitle + " – Байка Сковороди Григорія Савича",
    "Сковорода байка " + selectedFable.metadata.fableNumber,
    "Сковорода байка " + selectedFable.metadata.fableTitle,
  ];

  const metaTitle = selectedFable.metadata.fableTitle + " – Байка Сковороди Григорія Савича";

  return {
    props: {
      deviceEnding,
      selectedId: id,
      pageKey: fableSelectedPageKey,
      breadcrumbLabel: selectedFable.metadata.fableTitle,
      metadataTitle: metaTitle,
      metadataDescription: metaDescription,
      metadataKeywords: metaKeywords,
      metadataAuthorUrl: "https://uk.wikipedia.org/wiki/Сковорода_Григорій_Савич",
      allFablesMetadata,
      selectedFable,
      selectedNotes,
      allTranslators: skTranslatorsV2,
      shouldBeIndexed: true,
      selectedComment, selectedComment,
      selectedCommonMetadata, selectedCommonMetadata,
      canonicalPageUrl: "https://www.skovoroda.club/texts/fables/" + id,
      facebookImageUrl: selectedFable.metadata.fableImage ? selectedFable.metadata.fableImage.imageUrl : null,
    },
  };
}