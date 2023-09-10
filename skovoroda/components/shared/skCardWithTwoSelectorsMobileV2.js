import { Card, Select, Text, createStyles } from "@mantine/core";
import { LinkInsideSelect } from "../auxiliary/linkInsideSelectItem";

const useStyles = createStyles((theme) => ({

  labelText: {
    fontWeight: 300,
    fontSize: "20px",
    lineHeight: "23px",
    letterSpacing: "0.04em",
  },

  card: {
    ".mantine-Select-input": {
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: "23px",
      letterSpacing: "0.04em",
    },
  },

}));

export default function SkCardWithTwoSelectorsMobileV2({ dropdown1, dropdown2}) {
  
  const { classes } = useStyles();

  return <Card className={classes.card} withBorder={false} w="100%" px="md" py="md" m="0" >

    <Text mb="xs" className={classes.labelText}>{dropdown1.label}</Text>
    <Select 
      size="sm"
      withinPortal={true}
      searchable
      mb="md"
      itemComponent={LinkInsideSelect} 
      data={dropdown1.data} 
      value={dropdown1.selectedValue}
      onChange={dropdown1.onChange}>
    </Select>
      

    <Text mb="xs" className={classes.labelText}>{dropdown2.label}</Text>
    <Select 
      size="sm"
      withinPortal={true}
      searchable
      itemComponent={LinkInsideSelect} 
      data={dropdown2.data} 
      value={dropdown2.selectedValue}
      onChange={dropdown2.onChange}
      >
    </Select>

  </Card>
}