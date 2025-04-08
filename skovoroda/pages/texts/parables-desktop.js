import { Text } from '@mantine/core';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import { getParablesPageProps } from '../../lib/staticProps/parablesStatic';

export default function SkParablesPageDesktop({ parables }) {

  return <>

    <SkH1Desktop text={"Притчі Сковороди"} />

    <Text>Сторінка ще не готова</Text>

  </>
}

export async function getStaticProps({ params }) {
  return getParablesPageProps();
}