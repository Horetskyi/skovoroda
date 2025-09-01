
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import { skTranslatorsV2 } from '../../../lib/data/skovorodaTranslators';
import { SkovorodaGardenRefactored } from '../../../lib/dataReaders/songsReader';
import getSelectedNoteNumbersByContent from '../../../lib/metaTextUsages/getSelectedNoteNumbersByContent';
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { getOriginalSongId } from '../../../lib/sadIds';
import { gardenSelectedPageKey, SkovorodaConstants } from '../../../lib/skovorodaConstants';
import dynamic from 'next/dynamic';
import { isLineIncludesNoteNumbers } from '../../../lib/metaTextUsages/metaTextUsageUtils';

const GardenSongPageDesktop = dynamic(() => import('../../../components/pages/gardenSongPageDesktop'));
const GardenSongPageMobile = dynamic(() => import('../../../components/pages/gardenSongPageMobile'));

export default function SkovorodaGardenSongPage(params)  {
  
  return params.isMobile ? 
    <GardenSongPageMobile {...params} /> :
    <GardenSongPageDesktop {...params} />;
}

// Get all Songs Paths
export async function getStaticPaths() {
  
  const allSongIds = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata.id);
  // console.log("All Garden Songs Ids:", allSongIds);
  return getStaticPathsCommon(allSongIds);
}

// Get Garden Data by Id
export async function getStaticProps({ params }) {
  
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const selectedSong = SkovorodaGardenRefactored.allSongs.find(song => song.songMetadata.id == id);
  const allSongsMetadata = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata);
  const selectedNoteNumbers = getSelectedNoteNumbersByContent(selectedSong.songContent);
  
  const selectedNotes = SkovorodaGardenRefactored.allNotes.filter(notes => 
    notes.notesMetadata.source == selectedSong.songMetadata.source &&
    notes.notesMetadata.translatorName == selectedSong.songMetadata.translatorName)
    .flatMap(notes => notes.notes.lines)
    .filter(line => line && isLineIncludesNoteNumbers(line, selectedNoteNumbers));

  allSongsMetadata.sort((a,b) => a.number - b.number);

  // Source
  const selectedSongSource = SkovorodaSourcesArray.find(source => source.devNumber == selectedSong.songMetadata.source);
  selectedSong.source = selectedSongSource;

  // Apply original metadata on top of translated song
  if (selectedSong.songMetadata.translatorId != 0) {
    const originalSongId = getOriginalSongId(selectedSong.songMetadata.id);
    const originalSong = SkovorodaGardenRefactored.allSongs.find(s => s.songMetadata.id === originalSongId);
    if (originalSong.songMetadata.music) {
      selectedSong.songMetadata.music = originalSong.songMetadata.music;
    }
  }

  const metaDescriptionLastTry = selectedSong.songMetadata.name + " - Григорій Савич Сковорода";

  return {
    props: {
      // APP LEVEL {
      deviceEnding,
      pageKey: gardenSelectedPageKey,
      breadcrumbLabel: selectedSong.songMetadata.name,
      selectedId: id,
      // APP LEVEL }

      // SEO {
      shouldBeIndexed: true,
      metadataTitle: selectedSong.songMetadata.name + " - Сковорода",
      metadataDescription: SkovorodaConstants.contentToMetaDescription(selectedSong.songContent, null, metaDescriptionLastTry),
      canonicalPageUrl: "https://www.skovoroda.club/texts/garden/" + id,
      facebookImageUrl: selectedSong.songMetadata.songImage ? selectedSong.songMetadata.songImage.imageUrl : null,
      // SEO }

      // TECH {
      selectedSong,
      selectedNotes,
      allSongsMetadata,
      allTranslators: skTranslatorsV2,
      // TECH }
    },
  };
}
