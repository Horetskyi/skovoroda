import { Flex, List, Space } from "@mantine/core";
import SkMetaTextView from "../shared/skMetaTextView";
import SkTextLink from "../shared/skTextLink";
import { getSourcePath, getTreatisePath } from "../../lib/skovorodaPath";
import { getCharacterH1, getCharacterH2Texts, getNamesSubHeader } from "../../lib/staticProps/charactersContent";
import SkColoredContainerMobile from "../shared/skColoredContainerMobile";
import SkH1Mobile from "../shared/skH1Mobile";
import SkH2Mobile from "../shared/skH2Mobile";
import SkH2MobileV2 from "../shared/skH2MobileV2";

export default function SkCharacterPageMobile({ character }) {
  
  return <div>
    
    <SkH1Mobile text={getCharacterH1(character)} withBlueImage={true} />

    <Space h={"md"} />

    <SkH2MobileV2 text={character.names.join(', ')} subHeader={getNamesSubHeader(character)} />

    <SkColoredContainerMobile px={"md"}>

      <Flex gap={"md"} direction={"column"} mb={"lg"}>
        { character.about.map((item, index) => {
          const sourceText = item.source && item.source.shortTitle ? `[${item.source.shortTitle}]` : null;
          return <div key={index} className="normalContentText">
            <SkMetaTextView key={index} metaText={item.text} otherArgs={{isv3: true}} isMobile={true} />
            {sourceText ? <SkTextLink 
              text={sourceText} 
              title={item.source.shortTitle} 
              href={getSourcePath(item.source.id)}
            /> : null}
          </div>
        })}
      </Flex>
      
      <SkH2Mobile text={getCharacterH2Texts(character)} mb="lg" mt="xl"/>

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

    </SkColoredContainerMobile>

  </div>
}
