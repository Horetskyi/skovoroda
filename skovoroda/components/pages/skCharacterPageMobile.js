import { Flex, List, Text } from "@mantine/core";
import SkMetaTextView from "../shared/skMetaTextView";
import SkTextLink from "../shared/skTextLink";
import { getSourcePath, getTreatisePath } from "../../lib/skovorodaPath";
import { getCharacterH1, getCharacterH2Texts } from "../../lib/staticProps/charactersContent";
import SkColoredContainerMobile from "../shared/skColoredContainerMobile";
import SkH1Mobile from "../shared/skH1Mobile";
import SkH2Mobile from "../shared/skH2Mobile";

export default function SkCharacterPageMobile({ character }) {
  
  return <SkColoredContainerMobile px={"md"}>
    <SkH1Mobile text={getCharacterH1(character)}/>
    <Text mb={"lg"} mt={-12} fz={28} ta={'center'}>{character.names.join(', ')}</Text>

    <Flex gap={"md"} direction={"column"} mb={"lg"}>
      { character.about.map((item, index) => {
        const sourceText = `[${item.source.shortTitle}]`;
        return <div key={index} className="normalContentText">
          <SkMetaTextView key={index} metaText={item.text} otherArgs={{isv3: true}} isMobile={true} />
          <SkTextLink 
            text={sourceText} 
            title={item.source.shortTitle} 
            href={getSourcePath(item.source.id)}
          />
        </div>
      })}
    </Flex>
    
    <SkH2Mobile text={getCharacterH2Texts(character)} mb="lg" mt="xl"/>

    <List mb={"md"}>
      { character.texts.map((text, index) => {
        return <List.Item key={index}>
          <SkTextLink 
            text={text.title} 
            title={text.title} 
            href={getTreatisePath(text.urlId)}
          />
        </List.Item>
      })}
    </List>

  </SkColoredContainerMobile>
}
