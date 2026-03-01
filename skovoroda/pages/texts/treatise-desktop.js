import { Accordion, Checkbox, Container, Group, List, Space, Stack, Text, TextInput, Title } from '@mantine/core';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import Link from 'next/link';
import { SkovorodaTreatisePath, pathJoin } from '../../lib/skovorodaPath';
import SkMetaTextView from '../../components/shared/skMetaTextView';
import SkH2Desktop from '../../components/shared/skH2Desktop';
import SkColoredContainerDesktop from '../../components/shared/skColoredContainerDesktop';
import SkNote from '../../components/shared/skNote';
import { getTreatisesPageProps } from '../../lib/staticProps/trearisesStatic';
import { trearisesContent } from '../../lib/staticProps/treatisesContent';
import { IconSearch } from '@tabler/icons-react';
import classes from './treatise-desktop.module.scss';
import useTreatiseFilter from '../../hooks/useTreatiseFilter';
import { recommendedTreatisesList } from '../../lib/data/treatises/generic/treatisesGenericData';
import RecommendedTreatisesDesktop from '../../components/recommendedTreatisesDesktop';

export default function SkTreatisePageDesktop({ treatises, sourcesTextContent }) {
  
  const {
    searchText,
    setSearchText,
    filters,
    setFilterChecked,
    filteredTreatises
  } = useTreatiseFilter(treatises, trearisesContent.filtersByTypes);

  return <>

    <SkH1Desktop text={trearisesContent.h1} withBlueImage={true} />

    {/* Recommended List */}
    <SkH2Desktop text={trearisesContent.h2Recommended} mt={-16} id={"recommended"} />
    <SkColoredContainerDesktop>
      <RecommendedTreatisesDesktop
        recommendedTreatisesList={recommendedTreatisesList}
        treatises={treatises}
      />
    </SkColoredContainerDesktop>
    
    {/* Full List */}
    <SkH2Desktop text={trearisesContent.h2FullList} mt="md" mb="sm" 
      id={"full-list-chronology"}
      subHeader={"В порядку дати написання"} />
    <SkColoredContainerDesktop>
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
    </SkColoredContainerDesktop>

    {/* Search and Filters*/}
    <SkH2Desktop text={trearisesContent.h2Details} mt="md" id={"detailed-search"} />
    <SkColoredContainerDesktop>
      
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

      <Accordion variant="contained" radius="md" className={classes.filtersAccordion}
        classNames={{
          chevron: classes.filtersAccordionChevron,
          control: classes.filtersAccordionControl,
          item: classes.filtersAccordionItem,
          content: classes.filtersAccordionContent,
          panel: classes.filtersAccordionPanel,
        }}>
        <Accordion.Item value="filters" color='indigo.0'>
          <Accordion.Control bg={"indigo.0"}>
            <Text className='normalContentText normalContentText_withoutIndent'>{trearisesContent.filtersByTypesLabel}</Text>
          </Accordion.Control>
          <Accordion.Panel bg={"gray.0"}>
            <Stack gap={"xs"} mb="sm" mt="sm">
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
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </SkColoredContainerDesktop>

    {/* Rich List */}
    {filteredTreatises.map((treatise, index) => {

      const href = pathJoin(SkovorodaTreatisePath, treatise.urlId);
      const preferedVersion = treatise.versions.find(v => v.preferedVersion);
      const preferedTitle = preferedVersion.title;
      const introContent = treatise.introContent;
      const writtenDate = treatise.writtenDate;
      writtenDate.sort((a,b) => a.orderNumber - b.orderNumber);
      const linkTitle = `${preferedTitle} завантажити переклади, оригінал`;

      return <div key={treatise.urlId} className={classes.treatiseContainer2}><Container w={900} bg={"white"} className={classes.treatiseContainer} p={"md"} mb={"xl"}>
        
        {/* H2 */}
        <Title order={2} pb="sm">
          <Link href={href} title={linkTitle} className={`${classes.h2Link} linkWithoutDecoration`}>{preferedTitle}</Link>
        </Title>

        {/* Intro Content */}
        <SkMetaTextView metaText={introContent} otherArgs={{isv2: true}} />
        
        {/* Dates Text */}
        <Container my="sm" px="0" py="6px" className={classes.dates}>
          {writtenDate.map(date => {
            return <Text key={date.text} className='normalContentText'>
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
      </Container></div>
    })}

    {/* Notes */}
    <SkColoredContainerDesktop>
      <SkH2Desktop text={trearisesContent.h2Notes} mb="lg"/>
      <SkMetaTextView metaText={sourcesTextContent} otherArgs={{isv3: true}} />
      <Space h='md'/>
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getTreatisesPageProps();
}