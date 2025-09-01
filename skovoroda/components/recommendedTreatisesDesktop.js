import { List, Text, Group, Title } from '@mantine/core';
import Link from 'next/link';
import { pathJoin, SkovorodaTreatisePath } from '../lib/skovorodaPath';
import SkImage from './shared/skImage';
import classes from './recommendedTreatisesDesktop.module.scss';
import { adjustImageHeight, getAdjustedHeight, getAdjustedWidth } from './functions/imageFunctions';

export default function RecommendedTreatisesDesktop({ 
  recommendedTreatisesList, 
  treatises }) 
{
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
      const imageHeight = image ? getAdjustedHeight(300, image.height, image) : 0;
      if (image) {
        image.width = 300;
        image.height = imageHeight;
      }

      return <List.Item key={index} m={0} p={0} pb={"xl"}>
        <Group align="flex-start" spacing={0} className={classes.desktopGroup}>
          <div className={classes.number}><span>{index + 1}</span></div>
          {image && (
            <div className={classes.imageWrapper}>
              <SkImage 
                image={image} 
                fullContainerWidth={false} 
                height={imageHeight} 
                width={300} 
                gentlyShadow={true}
              />
            </div>
          )}
          <div className={classes.contentWrapper}>
            <Title order={3} className={classes.titleH3}>
              <Link href={href} title={linkTitle} className={classes.titleLink}>
                {preferedTitle}
              </Link>
            </Title>
            <Text className='readFontV2' mb="md">
              {treatise.comments}
            </Text>
          </div>
        </Group>
      </List.Item>;
    }).filter(item => item)}
  </List>;
}
