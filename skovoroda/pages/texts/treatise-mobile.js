import { Checkbox, Container, Group, List, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import Link from 'next/link';
import { SkovorodaTreatisePath, pathJoin } from '../../lib/skovorodaPath';
import SkMetaTextView from '../../components/shared/skMetaTextView';
import SkNote from '../../components/shared/skNote';
import { getTreatisesPageProps } from '../../lib/staticProps/trearisesStatic';
import { trearisesContent } from '../../lib/staticProps/treatisesContent';
import { IconChevronRight, IconSearch } from '@tabler/icons';
import SkH1Mobile from '../../components/shared/skH1Mobile';
import SkColoredContainerMobile from '../../components/shared/skColoredContainerMobile';
import SkH2Mobile from '../../components/shared/skH2Mobile';
import classes from './treatise-mobile.module.scss';
import useTreatiseFilter from '../../hooks/useTreatiseFilter';
import SkTextLink from '../../components/shared/skTextLink';
import { recommendedTreatisesList } from '../../lib/data/treatises/generic/treatisesGenericData';
import SkH2MobileV2 from '../../components/shared/skH2MobileV2';

export default function SkTreatisePageMobile({ treatises, sourcesTextContent }) {
  
  const {
    searchText,
    setSearchText,
    filters,
    setFilterChecked,
    filteredTreatises
  } = useTreatiseFilter(treatises, trearisesContent.filtersByTypes);

  return <>

    <SkH1Mobile text={trearisesContent.h1} withBlueImage={true} />

    {/* Recommended List */}
    <Space h="md" />
    <SkH2MobileV2 text={trearisesContent.h2Recommended} isAlternate={true} />
    <SkColoredContainerMobile px="md">
      <List type="ordered" spacing={"md"}>
        {recommendedTreatisesList.map((treatise, index) => {
          const foundTreatise = treatises.find(t => t.urlId === treatise.id);
          const href = pathJoin(SkovorodaTreatisePath, foundTreatise.urlId);
          const preferedVersion = foundTreatise.versions.find(v => v.preferedVersion);
          const preferedTitle = preferedVersion.title;
          const linkTitle = `${preferedTitle} завантажити переклади, оригінал`;
          return <List.Item key={index}>
            <Link href={href} title={linkTitle} className='normalContentText readFont'>
              {preferedTitle}
            </Link>
            <Text className='normalContentText readFont' mt="sm">
              {treatise.comments}
            </Text>
          </List.Item>
        })}
      </List>
    </SkColoredContainerMobile>
    
    {/* Full List */}
    <SkH2Mobile text={trearisesContent.h2FullList} mt="md" mb="sm" />
    <Text className={classes.orderText}>В порядку дати написання</Text>
    <SkColoredContainerMobile px="md">
      <List type="ordered" spacing={"xs"}>
        {treatises.map((treatise, index) => {
          const href = pathJoin(SkovorodaTreatisePath, treatise.urlId);
          const preferedVersion = treatise.versions.find(v => v.preferedVersion);
          const preferedTitle = preferedVersion.title;
          const linkTitle = `${preferedTitle} завантажити переклади, оригінал`;
          return <List.Item key={index}>
            <Link href={href} title={linkTitle} className='normalContentText readFont'>
              {preferedTitle}
            </Link>
          </List.Item>
        })}
      </List>
    </SkColoredContainerMobile>

    {/* Search and Filters */}
    <SkH2Mobile text={trearisesContent.h2Details} mt="md" />
    <SkColoredContainerMobile px="md">
      
      <TextInput 
        placeholder='Наприклад: "Наркіс"' 
        label="Пошук за назвою:"
        aria-label="Пошук трактату за назвою"
        radius="md"
        size="lg"
        mb="md"
        className={classes.searchBox}
        classNames={{
          section: classes.searchBoxIconSection,
          input: 'normalContentText normalContentText_withoutIndent',
          label: 'normalContentText normalContentText_withoutIndent',
        }}
        rightSectionPointerEvents="none"
        rightSection={<IconSearch style={{ width: 24, height: 24 }} />}
        value={searchText}
        onChange={(event) => setSearchText(event.currentTarget.value)} />

      <Text mb="sm" className='normalContentText normalContentText_withoutIndent'>{trearisesContent.filtersByTypesLabel}</Text>
      <Stack gap={"xs"} mb="sm">
        {filters.map(filter => {
          return <Checkbox 
            color="blue.2"
            key={filter.key}
            checked={filter.checked}
            onChange={(event) => setFilterChecked(filter.key, event.currentTarget.checked)} 
            className='normalContentText normalContentText_withoutIndent' 
            label={filter.text} 
          />
        })}
      </Stack>
      <Text className='normalContentText normalContentText_withoutIndent'>{trearisesContent.filtersByTypesLabelNote}</Text>
    </SkColoredContainerMobile>

    {/* List */}
    {filteredTreatises.map((treatise, index) => {

      const href = pathJoin(SkovorodaTreatisePath, treatise.urlId);
      const preferedVersion = treatise.versions.find(v => v.preferedVersion);
      const preferedTitle = preferedVersion.title;
      const introContent = treatise.introContent;
      const writtenDate = treatise.writtenDate;
      writtenDate.sort((a,b) => a.year - b.year);
      const linkTitle = `${preferedTitle} скачати переклади, оригінал`;
      
      const bg = (index % 2 === 0) ? "gray.0" : "white";
      
      return <Container key={treatise.urlId} px="md" py="md" bg={bg}>
        
        {/* H2 */}
        <Title order={2} pb="md">
          <SkTextLink text={preferedTitle} href={href} title={linkTitle} onHoverStylesOnly={true} className={classes.h2Link} />
        </Title>

        {/* Intro Content */}
        <SkMetaTextView metaText={introContent} otherArgs={{isv2: true}} isMobile={true} />
        
        {/* Dates Text */}
        <Container my="sm" px="0" py="6px" className={classes.dates}>
          {writtenDate.map(date => {
            return <Text key={date.text} className={'normalContentText normalContentText_withoutIndent'} ml="sm">
              {date.text}
              {date.noteNumber ? <SkNote noteNumber={date.noteNumber} /> : null}
            </Text>
          })}
        </Container>

        {/* Dates Line */}
        <Group className={classes.dateBoxTexts + ' normalContentText normalContentText_withoutIndent'} w={"100%"}>
          <Text>{trearisesContent.birthYearText}</Text>
          <Text>{trearisesContent.deathYearText}</Text>
        </Group>
        <Container p="0" bg="gray.2" h={"12px"} w={"100%"} className={classes.dateBoxContainer}>
          {writtenDate.map(date => {
            const leftPercent = ((date.year - 1722) * 100.0) / 72.0;
            const leftCss = `${leftPercent}%`;
            return <div key={date.text} className={classes.dateBox} style={{ left: leftCss }} />
          })}
        </Container>
      </Container>
    })}

    {/* Notes */}
    <SkColoredContainerMobile color={"gray.0"} px="md">
      <SkH2Mobile text={trearisesContent.h2Notes} mb="md"/>
      <SkMetaTextView metaText={sourcesTextContent} otherArgs={{isv3: true}} isMobile={true} />
    </SkColoredContainerMobile>
  </>
}

export async function getStaticProps({ params }) {
  return getTreatisesPageProps();
}