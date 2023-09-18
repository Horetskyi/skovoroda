import { Card, Select, Text, createStyles } from "@mantine/core";
import { LinkInsideSelect } from "../auxiliary/linkInsideSelectItem";

const useStyles = createStyles((theme) => ({

  labelText: {
    fontWeight: 300,
    fontSize: "12px",
    lineHeight: "14px",
    letterSpacing: "0",
  },

  card: {
    ".mantine-Select-input": {
      fontWeight: 300,
      fontSize: "12px",
      lineHeight: "14px",
      letterSpacing: "0",
    },
  },

}));

export default function SkCardWithTwoSelectorsMobileV2({ dropdown1, dropdown2}) {
  
  const { classes } = useStyles();

  return <Card className={classes.card} withBorder={false} w="100%" px="md" py="0" m="0" >

    <Text mb="xs" className={classes.labelText}>{dropdown1.label}</Text>
    <Select 
      size="xs"
      withinPortal={true}
      searchable={false}
      mb="sm"
      itemComponent={LinkInsideSelect} 
      data={dropdown1.data} 
      value={dropdown1.selectedValue}
      onChange={dropdown1.onChange}>
    </Select>
      

    <Text mb="xs" className={classes.labelText}>{dropdown2.label}</Text>
    <Select 
      size="xs"
      withinPortal={true}
      searchable={false}
      itemComponent={LinkInsideSelect} 
      data={dropdown2.data} 
      value={dropdown2.selectedValue}
      onChange={dropdown2.onChange}
      >
    </Select>

  </Card>
}