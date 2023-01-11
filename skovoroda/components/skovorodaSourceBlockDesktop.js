import { createStyles, Image } from "@mantine/core";
import Link from "next/link";

const useStyles = createStyles(() => ({
  imageContainer: {
    width: "100%",
    textAlign: "center",
  },
  image: {
    margin: 'auto',
  }
}));

export default function SkovorodaSourceBlockDesktop({source}) {

  if (!source) {
    return <></>;
  }

  const { classes } = useStyles();
  return <>
    <Link href={source.sourceHref}><a color="gray.9" className="grayForText">{source.sourceName}</a></Link>
    { 
      source.bookCoverImageSrc ? <>
      
      <div className={classes.imageContainer}>
        <Image mt="md" className={classes.image} src={source.bookCoverImageSrc} alt={source.sourceName} width={240} height={360} />
      </div>

      </> : <></>
    }
  </>
}