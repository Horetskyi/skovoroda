import { Checkbox, Container, Group, Stack, Text, Title, createStyles } from '@mantine/core';
import Link from 'next/link';
import { SkovorodaTreatisePath, pathJoin } from '../../lib/skovorodaPath';
import SkTextContentBlockDesktop from '../../components/shared/skTextContentBlockDesktop';
import SkNote from '../../components/shared/skNote';
import { useState } from 'react';
import { getTreatisesPageProps } from '../../lib/pagesContent/trearisesStatic';
import { trearisesContent } from '../../lib/pagesContent/treatisesContent';
import { IconChevronRight } from '@tabler/icons';
import SkH1Mobile from '../../components/shared/skH1Mobile';
import SkColoredContainerMobile from '../../components/shared/skColoredContainerMobile';
import SkH2Mobile from '../../components/shared/skH2Mobile';

const useStyles = createStyles((theme) => ({
  h2Link: {
    fontSize: "24px !important",
    color: theme.colors.blue[9],
    textDecoration: "none",
    "span": {
      lineHeight: "20px",
    }
  },
  linkIcon: {
    marginLeft: theme.spacing.xs,
    marginBottom: "-4px",
  },
  dates: {
    borderLeftColor: theme.colors.blue[2],
    borderLeftStyle: "solid",
    borderLeftWidth: "8px",
  },
  dateBoxContainer: {
    position: "relative"
  },
  dateBox: {
    background: theme.colors.blue[2],
    width: "12px",
    height: "12px",
    position: "absolute",
    top: 0,
    content: "''",
  },
  dateBoxTexts: {
    justifyContent: "space-between",
    gap: 0,
  },
}));

export default function SkTreatisePageMobile({ treatises, sourcesTextContent }) {
  
  const { classes } = useStyles();
  
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

    <SkH1Mobile text={trearisesContent.h1} mt="md" />

    {/* Filters */}
    <SkColoredContainerMobile px="md">
      <Text mb="sm" className='normalContentText normalContentText_withoutIndent'>{trearisesContent.filtersByTypesLabel}</Text>
      <Stack spacing={"xs"} mb="sm">
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
    </SkColoredContainerMobile>

    {/* List */}
    {filtered.map((treatise, index) => {

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
        <Title order={2} pb="sm">
          <Link href={href} title={linkTitle} className={classes.h2Link + " normalContentText"}>
            <Text component='span'>{preferedTitle}</Text>
            <IconChevronRight className={classes.linkIcon}/>
          </Link>
        </Title>

        {/* Intro Content */}
        <SkTextContentBlockDesktop textContent={introContent} isv2={true} isMobile={true} />
        
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
      <SkTextContentBlockDesktop textContent={sourcesTextContent} isv3={true} isMobile={true} />
    </SkColoredContainerMobile>
  </>
}

export async function getStaticProps({ params }) {
  return getTreatisesPageProps();
}