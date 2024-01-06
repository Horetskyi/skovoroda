import { Image, Text, Title, Stack, Badge  } from '@mantine/core';
import SourceV1 from './sourceV1';
import DownloadStackV1 from './downloadStackV1';
import { SkovorodaConstants } from '../lib/skovorodaConstants';
import classes from './skovorodaTextBlockMobile.module.scss';

export default function SkovorodaTextBlockMobile(props) {
  
  const badgeText = SkovorodaConstants.getTypeText(props.textType);

  return <>
  
    <Title order={3} size="h4" mt={0} mb="xs" fw={500}>{props.textName}</Title>

    <Badge radius="md" width={300} variant="outline" color="dark">{badgeText}</Badge>

    {props.imageSrc 
    ? <Image mt="md" mb="md" src={props.imageSrc} alt={props.sourceName} width={120} height={180} className={classes.image} />
    : <></>
    }

    { (props.textType === "translation") ? 
      <Stack spacing="0" mb="md">
        <Text size="sm" color="gray.9">
          Перекладач
        </Text>
        <Text fw={500}>{props.translatorName}</Text>
      </Stack>
    : <></>}

    <SourceV1 {...props}/>
    <div className={classes.downloadStack}>
      <DownloadStackV1  {...props} colortype={props.textType}/>
    </div>

  </>;
}
