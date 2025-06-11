
import { SkovorodaGardenRefactored } from '../../../lib/data/skovorodaGarden';
import { SkovorodaSourcesArray } from '../../../lib/data/skovorodaSources';
import { skTranslatorsV2 } from '../../../lib/data/skovorodaTranslators';
import getSelectedNoteNumbersByContent from '../../../lib/getSelectedNoteNumbersByContent';
import getStaticPathsCommon from '../../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../../lib/readDynamicIdCommon';
import { getOriginalSongId } from '../../../lib/sadIds';
import { gardenSelectedPageKey, SkovorodaConstants } from '../../../lib/skovorodaConstants';
import dynamic from 'next/dynamic';

const GardenSongPageDesktop = dynamic(() => import('../../../components/pages/gardenSongPageDesktop'));
const GardenSongPageMobile = dynamic(() => import('../../../components/pages/gardenSongPageMobile'));

export default function SkovorodaGardenSongPage(params) 
{
  return <>
    {params.deviceEnding == SkovorodaConstants.desktopEnding ? 
      <GardenSongPageDesktop {...params} /> :
      <GardenSongPageMobile {...params} />}
  </>;
}

// Get all Songs Paths
export async function getStaticPaths() {
  
  const allSongIds = SkovorodaGardenRefactored.allSongs.map(song => song.songMetadata.id);
  console.log("All Garden Songs Ids:", allSongIds);
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
    .flatMap(notes => notes.notes)
    .filter(lineObject => selectedNoteNumbers.includes(lineObject.noteNumber) ||
      lineObject.songNumber == selectedSong.songMetadata.number);

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

  return {
    props: {
      pageKey: gardenSelectedPageKey,
      breadcrumbLabel: selectedSong.songMetadata.name,
      selectedId: id,
      metadataTitle: selectedSong.songMetadata.name + " - Сковорода",
      metadataDescription: selectedSong.songMetadata.name + " - Григорій Савич Сковорода",
      selectedSong,
      selectedNotes,
      allSongsMetadata,
      deviceEnding,
      shouldBeIndexed: true,
      canonicalPageUrl: "https://www.skovoroda.club/texts/garden/" + id,
      allTranslators: skTranslatorsV2,
      facebookImageUrl: selectedSong.songMetadata.songImage ? selectedSong.songMetadata.songImage.imageUrl : null,
    },
  };
}