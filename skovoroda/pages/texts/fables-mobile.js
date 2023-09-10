import { Container, List, createStyles } from "@mantine/core";
import SkH1Mobile from "../../components/shared/skH1Mobile";
import { SkovorodaFablesPath, getFableLinkTitle, pathJoin } from "../../lib/skovorodaPath";
import SkTextLink from "../../components/shared/skTextLink";
import { prepareFables } from "../../lib/pagesContent/fablesLogic";
import { fablesPageContent } from "../../lib/pagesContent/fablesContent";
import { getFablesPageProps } from "../../lib/pagesContent/fablesStatic";
import SkColoredContainerMobile from "../../components/shared/skColoredContainerMobile";

const useStyles = createStyles((theme) => ({
}));

export default function FablesPage({ allFables }) {
  const { classes } = useStyles();
  const fables = prepareFables(allFables);
  return <>
    <SkColoredContainerMobile>
      <Container px={"sm"}>
        <SkH1Mobile text="Байки Харківські"/>
        <div className="normalContentText">
          <p>{fablesPageContent.introText}</p>
        </div>
        <List type="ordered" className="normalContentText normalContentText_withoutIndent">
          {fables.map(fable => {
            const href = pathJoin(SkovorodaFablesPath, fable.urlId);
            return <List.Item key={fable.urlId}>
              <SkTextLink text={fable.fableTitle} title={getFableLinkTitle(fable)} href={href} disableStyles={true}>
              </SkTextLink>
            </List.Item>
          })}
        </List>
      </Container>
    </SkColoredContainerMobile>
  </>
}

export async function getStaticProps({ params }) {
  return getFablesPageProps();
}