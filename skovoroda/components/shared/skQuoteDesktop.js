import { Flex, Text } from "@mantine/core";
import classes from './skQuoteDesktop.module.scss';

export default function SkQuoteDesktop({text,mb}) {

  return <>
    <Flex bg={"white"} className={classes.container} mih={64} mb={mb}>
      <Text className={classes.quotemark} color={"gray.6"}>“</Text>
      <Text className={`normalContentText normalContentText_withoutIndent ${classes.text}`}>
        {text}
      </Text>
    </Flex>    
  </>
}