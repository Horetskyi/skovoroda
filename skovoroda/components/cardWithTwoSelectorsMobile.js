import { Card, Select, Text } from "@mantine/core";
import { LinkInsideSelect } from "./auxiliary/linkInsideSelectItem";

export default function CardWithTwoSelectorsMobile({ dropdown1, dropdown2 }) {
  
  return <Card radius="md" mb="md" bg="blue.0" p="md" withBorder={true} id="card-with-two-selectors">
    <Card bg="blue.0" p="0">

      <Text fw="500" mb="xs" size="sm">{dropdown1.label}</Text>
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
      

      <Text fw="500" mb="xs" size="sm">{dropdown2.label}</Text>
      <Select 
        size="sm"
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