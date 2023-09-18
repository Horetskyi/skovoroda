import { Card, List, SimpleGrid, Space, Text, createStyles } from "@mantine/core";
import SkH1Desktop from "../../components/shared/skH1Desktop";
import SkColoredContainerDesktop from "../../components/shared/skColoredContainerDesktop";
import { SkovorodaConstants } from "../../lib/skovorodaConstants";
import SkImage from "../../components/shared/skImage";
import SkComponentLink from "../../components/shared/skComponentLink";
import { SkovorodaFablesPath, getFableLinkTitle, pathJoin } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { getFablesPageProps } from "../../lib/pagesContent/fablesStatic";
import { prepareFables } from "../../lib/pagesContent/fablesLogic";
import { fablesPageContent } from "../../lib/pagesContent/fablesContent";

const useStyles = createStyles((theme) => ({
  grid: {
    gap: theme.spacing.md,
  },
  fableGrayText: {
    color: theme.colors.gray[6],
    fontWeight: 300,
    fontSize: "16px",
    lineHeight: "19px",
    letterSpacing: "0.02em",
    paddingTop: "8px",
  },
  fableTitle: {
    textAlign: "center !important",
    minHeight: "60px",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function FablesPage({ allFables }) {
  const { classes } = useStyles();
  const fables = prepareFables(allFables);
  return <>
    <SkColoredContainerDesktop>
      <SkH1Desktop text="Байки Харківські"/>
      <div className="normalContentText">
        <p>{fablesPageContent.introText}</p>
      </div>
      
      <List type="ordered" className="normalContentText normalContentText_withoutIndent">
        {fables.map(fable => {
          const href = pathJoin(SkovorodaFablesPath, fable.urlId);
          return <List.Item key={fable.urlId}>
            <SkTextLink text={fable.fableTitle} title={getFableLinkTitle(fable)} href={href} disableStyles={false}>
            </SkTextLink>
          </List.Item>
        })}
      </List>
      
      {SkovorodaConstants.isProduction ? null : <>
        <Space h="lg"/>
        <SimpleGrid  cols={5} spacing={"md"} className={classes.grid} >
          {fables.map(fable => {
            const href = pathJoin(SkovorodaFablesPath, fable.urlId);
            return <SkComponentLink href={href} key={fable.urlId}>
              <Card shadow="md" p="0" m="0" radius={"md"}>
                <SkImage disableBottomRadius={true} imageUrl={fable.imageUrl} width={162} height={226} shadow={"0"} />
                <Text className={classes.fableGrayText} mx="auto" ta="center">Байка {fable.fableNumber}</Text>
                <Text className={classes.fableTitle + " normalContentText normalContentText_withoutIndent"} mx="auto" ta="center">{fable.fableTitle}</Text>
              </Card>
            </SkComponentLink>
          })}
        </SimpleGrid>
      </>}
      
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps({ params }) {
  return getFablesPageProps();
}