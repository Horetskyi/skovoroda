import { Card, Select, Text } from "@mantine/core";
import classes from './skCardWithTwoSelectorsDesktopV2.module.scss'; 
import { memo } from "react";

const SkCardWithTwoSelectorsDesktopV2 = memo(function SkCardWithTwoSelectorsDesktopV2({ dropdown1, dropdown2, idSuffix}) {
  
  if (!idSuffix || !idSuffix.length) {
    idSuffix = "normal";
  }

  return <Card withBorder={false} w="560px" p="0" m="0" >

    <Text mb="sm" className={classes.labelText}>{dropdown1.label}</Text>
    <Select 
      id={"dropdown1-"+idSuffix}
      size="md"
      searchable
      mb="md"
      data={dropdown1.data} 
      value={dropdown1.selectedValue}
      classNames={{
        input: classes.mantineSelectInput
      }}
      onChange={dropdown1.onChange}
      comboboxProps={{ keepMounted: true, middlewares: { flip: false, shift: false } }}
      aria-label={dropdown1.label}>
    </Select>
      

    <Text mb="sm" className={classes.labelText}>{dropdown2.label}</Text>
    <Select 
      id={"dropdown2-"+idSuffix}
      size="md"
      searchable
      data={dropdown2.data} 
      value={dropdown2.selectedValue}
      classNames={{
        input: classes.mantineSelectInput
      }}
      onChange={dropdown2.onChange}
      comboboxProps={{ keepMounted: true, middlewares: { flip: false, shift: false } }}
      aria-label={dropdown2.label}>
    </Select>

  </Card>
});
export default SkCardWithTwoSelectorsDesktopV2;
