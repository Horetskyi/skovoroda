import { Card, Title } from "@mantine/core";
import Link from "next/link";
import classes from './skovorodaSourceBlockDesktop.module.scss';
import SkImage from "./shared/skImage";

// DEPRECATED
export default function SkovorodaSourceBlockDesktop({source}) {

  if (!source) {
    return <></>;
  }
  return <Card id="source-content" p="md" mt="md" radius="md" withBorder={true} className="specialBorder">
    <Title ta={'center'} mb="md" order={2}>Джерело</Title>
    { 
      source.bookCoverImageSrc ? <>
      <div className={classes.imageContainer}>
        <SkImage mt="md" mb="md" radius="md" 
          additionalClassName={classes.image}
          imageUrl={source.bookCoverImageSrc} 
          alt={source.sourceName} 
          width={240} 
          height={360} 
        />
      </div>
      </> : <></>
    }
    <Link href={source.sourceHref} color="gray.9" className="grayForText">{source.sourceName}</Link>
  </Card>
}