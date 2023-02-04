import { Card, Select, Text } from "@mantine/core";
import { LinkInsideSelect } from "./auxiliary/linkInsideSelectItem";

export default function CardWithTwoSelectors({ dropdown1, dropdown2}) {
  
  return <Card radius="md" mb="xl" bg="blue.0" p="lg" withBorder={true} >
    <Card bg="blue.0" p="0" w="640px" mx={'auto'}>

      <Text fw="500" mb="xs" size="sm">{dropdown1.label}</Text>
      <Select 
        size="md"
        withinPortal={true}
        searchable
        mb="lg"
        itemComponent={LinkInsideSelect} 
        data={dropdown1.data} 
        value={dropdown1.selectedValue}
        onChange={dropdown1.onChange}>
      </Select>
      

      <Text fw="500" mb="xs" size="sm">{dropdown2.label}</Text>
      <Select 
        size="md"
        withinPortal={true}
        searchable
        itemComponent={LinkInsideSelect} 
        data={dropdown2.data} 
        value={dropdown2.selectedValue}
        onChange={dropdown2.onChange}>
      </Select>

    </Card>
  </Card>
}