import { Flex, List, Space } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkH2Desktop from "../shared/skH2Desktop";
import SkMetaTextView from "../shared/skMetaTextView";
import SkTextLink from "../shared/skTextLink";
import { getSourcePath, getTreatisePath } from "../../lib/skovorodaPath";
import SkColoredContainerDesktop from "../shared/skColoredContainerDesktop";
import { getCharacterH1, getCharacterH2Texts, getNamesSubHeader } from "../../lib/staticProps/charactersContent";
import SkH2DesktopV3 from "../shared/skH2DesktopV3";

export default function SkCharacterPageDesktop({ character }) {

  return <div>

    <SkH1Desktop text={getCharacterH1(character)} withBlueImage={true} />
    
    <SkH2DesktopV3 text={character.names.join(', ')} subHeader={getNamesSubHeader(character)} />
    
    <Space h={"xl"} />

    <SkColoredContainerDesktop>

      <Flex gap={"md"} direction={"column"} mb={"lg"}>
        { character.about.map((item, index) => {
          const sourceText = (item.source && item.source.shortTitle) ? `[${item.source.shortTitle}]` : null;
          return <div key={index} className="normalContentText">
            <SkMetaTextView key={index} metaText={item.text} otherArgs={{isv3: true}} />
            {sourceText ? <SkTextLink 
              text={sourceText} 
              title={item.source.shortTitle} 
              href={getSourcePath(item.source.id)}
            /> : null}
          </div>
        })}
      </Flex>
      
      <SkH2Desktop text={getCharacterH2Texts(character)} mb="lg" mt="xl"/>

      <List mb={"md"} type="ordered">
        { character.texts.map((text, index) => {
          return <List.Item key={index}>
            <SkTextLink 
              text={text.title} 
              title={text.title} 
              href={getTreatisePath(text.urlId)}
              className={'readFont'}
            />
          </List.Item>
        })}
      </List>

    </SkColoredContainerDesktop>

  </div>
}
