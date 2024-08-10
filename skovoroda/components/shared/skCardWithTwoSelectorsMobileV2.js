import { Card, Select, Text } from "@mantine/core";
import classes from './skCardWithTwoSelectorsMobileV2.module.scss'; 

export default function SkCardWithTwoSelectorsMobileV2({ dropdown1, dropdown2, idSuffix}) {
  
  if (!idSuffix || !idSuffix.length) {
    idSuffix = "normal";
  }

  return <Card withBorder={false} w="100%" px="md" py="0" m="0" >

    <Text mb="xs" className={classes.labelText}>{dropdown1.label}</Text>
    <Select 
      id={"dropdown1-"+idSuffix}
      size="xs"
      withinPortal={true}
      searchable={false}
      mb="sm"
      data={dropdown1.data} 
      value={dropdown1.selectedValue}
      classNames={{
        input: classes.mantineSelectInput
      }}
      onChange={dropdown1.onChange}
      aria-label={dropdown1.label}>
    </Select>
      

    <Text mb="xs" className={classes.labelText}>{dropdown2.label}</Text>
    <Select 
      id={"dropdown2-"+idSuffix}
      size="xs"
      withinPortal={true}
      searchable={false}
      data={dropdown2.data} 
      value={dropdown2.selectedValue}
      classNames={{
        input: classes.mantineSelectInput
      }}
      onChange={dropdown2.onChange}
      aria-label={dropdown2.label}
      >
    </Select>

  </Card>
}