import { Checkbox, Container, Group, Space, Stack, Text, Title, createStyles } from '@mantine/core';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import Link from 'next/link';
import { SkovorodaTreatisePath, pathJoin } from '../../lib/skovorodaPath';
import SkTextContentBlockDesktop from '../../components/shared/skTextContentBlockDesktop';
import SkH2Desktop from '../../components/shared/skH2Desktop';
import SkColoredContainerDesktop from '../../components/shared/skColoredContainerDesktop';
import SkNote from '../../components/shared/skNote';
import { useState } from 'react';
import { getTreatisesPageProps } from '../../lib/pagesContent/trearisesStatic';
import { trearisesContent } from '../../lib/pagesContent/treatisesContent';
import { IconChevronRight } from '@tabler/icons';
import classes from './treatise-desktop.module.scss';

export default function SkTreatisePageDesktop({ treatises, sourcesTextContent }) {
  
  const [filters, setFilters] = useState(trearisesContent.filtersByTypes);
  function setChecked(filterKey, checked) {
    const newFilters = [...filters];
    const index = newFilters.findIndex(filter => filter.key === filterKey);
    newFilters[index] = { ...newFilters[index], checked: checked }; 
    setFilters(newFilters);
  }
  
  const filteredTreatiseKeys = filters.filter(f => f.checked).map(f => f.key);
  const filtered = !filteredTreatiseKeys.length 
    ? treatises 
    : treatises.filter(treatise => filteredTreatiseKeys.includes(treatise.treatiseType));
  filtered.sort((a,b) => a.orderNumber - b.orderNumber);

  return <>

    <SkH1Desktop text={trearisesContent.h1} mt="lg" />

    {/* Filters */}
    <SkColoredContainerDesktop>
      <Text mb="sm" className='normalContentText normalContentText_withoutIndent'>{trearisesContent.filtersByTypesLabel}</Text>
      <Stack gap={"xs"} mb="sm">
        {filters.map(filter => {
          return <Checkbox 
            color="blue.2"
            key={filter.key}
            checked={filter.checked}
            onChange={(event) => setChecked(filter.key, event.currentTarget.checked)} 
            className='normalContentText normalContentText_withoutIndent' 
            label={filter.text} 
          />
        })}
      </Stack>
      <Text className='normalContentText normalContentText_withoutIndent'>{trearisesContent.filtersByTypesLabelNote}</Text>
    </SkColoredContainerDesktop>

    {/* List */}
    {filtered.map((treatise, index) => {

      const href = pathJoin(SkovorodaTreatisePath, treatise.urlId);
      const preferedVersion = treatise.versions.find(v => v.preferedVersion);
      const preferedTitle = preferedVersion.title;
      const introContent = treatise.introContent;
      const writtenDate = treatise.writtenDate;
      writtenDate.sort((a,b) => a.year - b.year);
      const linkTitle = `${preferedTitle} скачати переклади, оригінал`;

      return <Container key={treatise.urlId} w={900} bg={"white"} className={classes.treatiseContainer} p={"md"} mb={"lg"}>
        
        {/* H2 */}
        <Title order={2} pb="sm">
          <Link href={href} title={linkTitle} className={classes.h2Link + " normalContentText"}>{preferedTitle}<IconChevronRight className={classes.linkIcon}/></Link>
        </Title>

        {/* Intro Content */}
        <SkTextContentBlockDesktop textContent={introContent} isv2={true} />
        
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
      </Container>
    })}

    {/* Notes */}
    <SkColoredContainerDesktop color={"gray.1"}>
      <SkH2Desktop text={trearisesContent.h2Notes} mb="lg"/>
      <SkTextContentBlockDesktop textContent={sourcesTextContent} isv3={true} />
      <Space h='md'/>
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getTreatisesPageProps();
}