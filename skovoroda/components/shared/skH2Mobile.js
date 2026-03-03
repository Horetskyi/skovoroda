import { Title } from "@mantine/core";
import { memo } from 'react';

const SkH2Mobile = memo(function SkH2Mobile(props) {

  return <Title order={2} mx={"auto"} ta={"center"} {...props} >
    {props.text}
  </Title>
});
export default SkH2Mobile;