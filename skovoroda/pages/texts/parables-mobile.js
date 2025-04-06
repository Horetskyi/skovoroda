import { Text } from '@mantine/core';
import SkH1Mobile from '../../components/shared/skH1Mobile';
import { getParablesPageProps } from '../../lib/staticProps/parablesStatic';

export default function SkParablesPageMobile({ parables }) {

  return <>

    <SkH1Mobile text={"Притчі Сковороди"} mt="xl" />

    <Text>Сторінка ще не готова</Text>

  </>
}

export async function getStaticProps({ params }) {
  return getParablesPageProps();
}