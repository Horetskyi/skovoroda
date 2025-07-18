import { Flex, List, Text } from "@mantine/core";
import SkH1Desktop from "../shared/skH1Desktop";
import SkH2Desktop from "../shared/skH2Desktop";
import SkTextContentBlockDesktop from "../shared/skTextContentBlockDesktop";
import SkTextLink from "../shared/skTextLink";
import { getSourcePath, getTreatisePath } from "../../lib/skovorodaPath";
import SkColoredContainerDesktop from "../shared/skColoredContainerDesktop";
import { getCharacterH1, getCharacterH2Texts } from "../../lib/staticProps/charactersContent";

export default function SkCharacterPageDesktop({ character }) {
  
  return <SkColoredContainerDesktop>
    <SkH1Desktop text={getCharacterH1(character)}/>
    <Text mb={"lg"} mt={-12} fz={28} ta={'center'}>{character.names.join(', ')}</Text>

    <Flex gap={"md"} direction={"column"} mb={"lg"}>
      { character.about.map((item, index) => {
        const sourceText = `[${item.source.shortTitle}]`;
        return <div key={index} className="normalContentText">
          <SkTextContentBlockDesktop key={index} textContent={item.text} isv3={true} />
          <SkTextLink 
            text={sourceText} 
            title={item.source.shortTitle} 
            href={getSourcePath(item.source.id)}
          />
        </div>
      })}
    </Flex>
    
    <SkH2Desktop text={getCharacterH2Texts(character)} mb="lg" mt="xl"/>

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

  </SkColoredContainerDesktop>
}
