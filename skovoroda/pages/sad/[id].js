
import getStaticPathsCommon from '../../lib/getStaticPathsCommon';
import readDynamicIdCommon from '../../lib/readDynamicIdCommon';
import { SkovorodaSad } from '../../lib/data/skovorodaSad';
import { Card, Container, createStyles, Group, Header, Select, Stack, Title, Text } from '@mantine/core';
import { forwardRef, useState } from 'react';
import { SkovorodaConstants } from '../../lib/skovorodaConstants';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({

  emptyLine: {
    height: "14px",
  },

  sadText: {
    "& p": {
      fontSize: theme.fontSizes.md,
      marginBottom: "4px",
      marginTop: 0,
    }
  },

  formatRight: {
    textAlign: 'right',
  },
  formatCenter: {
    textAlign: 'center',
  },
  formatTabs3: {
    marginLeft: "112px",
  },

}));

export default function SkovorodaSadPage({ sadData, selectedId, deviceEnding }) {

  const { classes } = useStyles();

  const selectData = [
    { value: "original", label: "Оригінал", hrefItem: sadData.id },
  ];
  sadData.translates.forEach(translate => {
    const translatorName = translate.translator.fullName;
    const label = "Переклад - " + translatorName + " - " + translate.source.year + " р.";
    selectData.push({ value: translatorName, label: label, hrefItem: translate.id });
  });

  const defaultSelectedValue = selectData.find(data => data.hrefItem === selectedId).value;

  const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);

  if (defaultSelectedValue != selectedValue) {
    setSelectedValue(defaultSelectedValue);
  }
  
  console.log(selectedValue, defaultSelectedValue, selectedId);

  const selectedTranslate = selectedValue === "original" 
    ? undefined 
    : sadData.translates.find(translate => translate.translator.fullName === selectedValue);

  const selectedText = selectedTranslate ? selectedTranslate.text : sadData.text;
  const selectedPreText = selectedTranslate ? selectedTranslate.pretext : sadData.pretext;

  const textBlock = [];

  const formatClasses = {
    "center": classes.formatCenter,
    "right": classes.formatRight,
    "tabs3": classes.formatTabs3, 
  }

  function addToTextBlock(lineObject) {
    const text = lineObject.text;
    const key = textBlock.length;
    const formatClassName = lineObject.format ? formatClasses[lineObject.format] : "";
    const element = text 
      ? <p key={key} className={formatClassName}>{text}</p>
      : <p key={key} className={classes.emptyLine}></p>
    textBlock.push(element);
  }
  
  selectedPreText.forEach(addToTextBlock);
  addToTextBlock({text: ""})
  selectedText.forEach(addToTextBlock);

  const bgColor = SkovorodaConstants.getBackgroundColorByType(selectedValue);

  const SelectItem = forwardRef(function LinkInsideSelect({ hrefItem, label, ...others }, ref) { 
    return <Link ref={ref} href={hrefItem}><a>{label}</a></Link>
    // <div ref={ref} {...others} >
    // </div>
  });

  return <>
    <Container pt="lg" mb="xl">
      <Card bg={bgColor} withBorder radius="md">
        <Title ta={'center'} mt="0" mb="lg" order={1}>{sadData.originalName}</Title>
        <Select itemComponent={SelectItem} mb="lg" data={selectData} value={selectedValue} onChange={setSelectedValue}></Select>
        <Container size={600}>
          <Card bg={bgColor} className={classes.sadText}>
            {textBlock}
          </Card>
        </Container>
      </Card>
    </Container>
  </>;
}

// Get all Sad Paths
export async function getStaticPaths() {
  
  const skovorodaSad = await SkovorodaSad();
  const ids = skovorodaSad.array.flatMap(sad => {
    const sadIds = sad.translates.map(translate => translate.id);
    sadIds.push(sad.id);
    return sadIds;
  });
  console.log("All Sad Ids:", ids);
  return getStaticPathsCommon(ids);
}

// Get Sad Data by Id
export async function getStaticProps({ params }) {

  const skovorodaSad = await SkovorodaSad();
  const { id, deviceEnding } = readDynamicIdCommon(params.id);
  const idParts = id.split('-');
  const originalId = idParts[0]+'-'+idParts[1];
  const sadData = skovorodaSad.array.find(sad => sad.id === originalId);
  return {
    props: {
      sadData,
      selectedId: id,
      deviceEnding,
    },
  };
}