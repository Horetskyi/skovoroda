import { Card, Select, Text } from "@mantine/core";
import { useEffect } from "react";
import { LinkInsideSelect } from "./auxiliary/linkInsideSelectItem";

export default function CardWithTwoSelectorsDesktop({ dropdown1, dropdown2}) {
  
  return <Card radius="md" mb="xl" bg="blue.0" p="xl" withBorder={false} id="card-with-two-selectors" >
    <Card bg="blue.0" p="0" w="640px" mx={'auto'}>

      <Text mb="xs" size="md">{dropdown1.label}</Text>
      <Select 
        size="md"
        withinPortal={true}
        searchable
        mb="xl"
        itemComponent={LinkInsideSelect} 
        data={dropdown1.data} 
        value={dropdown1.selectedValue}
        onChange={dropdown1.onChange}>
      </Select>
      

      <Text mb="xs" size="md">{dropdown2.label}</Text>
      <Select 
        size="md"
        withinPortal={true}
        searchable
        itemComponent={LinkInsideSelect} 
        data={dropdown2.data} 
        value={dropdown2.selectedValue}
        onChange={dropdown2.onChange}
        >
      </Select>

    </Card>
  </Card>
}