import { List, Text, Group, Title } from '@mantine/core';
import Link from 'next/link';
import { pathJoin, SkovorodaTreatisePath } from '../lib/skovorodaPath';
import SkImage from './shared/skImage';
import classes from './recommendedTreatisesMobile.module.scss';

export default function RecommendedTreatisesMobile({ 
  recommendedTreatisesList, 
  treatises }) 
{
  var isFirstImage = true;

  return <List 
    type="ordered" 
    spacing="xl" 
    listStyleType="none" 
    p={0}
    m={0}
    mt={"md"}
    classNames={{itemWrapper: classes.listItemWrapper}}
  >
    {recommendedTreatisesList.map((treatise, index) => {
      const foundTreatise = treatises.find(t => t.urlId === treatise.id);
      if (!foundTreatise) return null;
      const href = pathJoin(SkovorodaTreatisePath, foundTreatise.urlId);
      const preferedVersion = foundTreatise.versions.find(v => v.preferedVersion);
      const preferedTitle = preferedVersion?.title || '';
      const linkTitle = `${preferedTitle} завантажити переклади, оригінал`;
      const image = treatise.image || foundTreatise.image || null;
      const isFirstImageTmp = isFirstImage;
      if (image) {
        isFirstImage = false;
      }
      
      return <List.Item key={index} m={0} p={0} pb={"xl"}>
        <Group align="flex-start" spacing={0}>
          <div className={classes.number}>{index + 1}</div>
          <div style={{ flex: 1 }}>
            <Title order={3} className={classes.titleH3}>
              <Link href={href} title={linkTitle} className={classes.titleLink}>
                {preferedTitle}
              </Link>
            </Title>
            <Text className='readFontV2' mt="md" mb="md">
              {treatise.comments}
            </Text>
            {image && (
              <SkImage image={image} fullContainerWidth={true} priority={isFirstImageTmp} optimize={true} />
            )}
          </div>
        </Group>
      </List.Item>;
    }).filter(item => item)}
  </List>;
}