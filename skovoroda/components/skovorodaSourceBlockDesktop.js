import { Card, createStyles, Image, Title } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  imageContainer: {
    width: "100%",
    textAlign: "center",
  },
  image: {
    margin: 'auto',
    img: {
      borderRadius: theme.radius.sm,
      boxShadow: theme.shadows.md,
    }
  }
}));

export default function SkovorodaSourceBlockDesktop({source}) {

  if (!source) {
    return <></>;
  }

  const { classes } = useStyles();

  return <Card p="md" mt="md" radius="md" withBorder={true}>
    <Title ta={'center'} mb="md" order={2}>Джерело</Title>
    { 
      source.bookCoverImageSrc ? <>
      <div className={classes.imageContainer}>
        <Image mt="md" mb="md" radius="md" 
          className={classes.image}
          src={source.bookCoverImageSrc} 
          alt={source.sourceName} 
          width={240} 
          height={360} 
        />
      </div>
      </> : <></>
    }
    <Link href={source.sourceHref}><a color="gray.9" className="grayForText">{source.sourceName}</a></Link>
  </Card>
}