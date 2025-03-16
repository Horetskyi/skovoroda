import { Text } from '@mantine/core';
import SkH1Desktop from '../../components/shared/skH1Desktop';
import { getParablesPageProps } from '../../lib/pagesContent/parablesStatic';

export default function SkParablesPageDesktop({ parables }) {

  return <>

    <SkH1Desktop text={"Притчі Сковороди"} mt="xl" />

    <Text>Сторінка ще не готова</Text>

  </>
}

export async function getStaticProps({ params }) {
  return getParablesPageProps();
}