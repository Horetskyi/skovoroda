import { Grid, Text } from '@mantine/core';
import Link from 'next/link';
import AnimatedMailComponent from '../components/animatedMailComponent';
import { pathJoin, SkovorodaLettersFromPath } from '../lib/skovorodaPath';
import SkH1Desktop from '../components/shared/skH1Desktop';
import SkColoredContainerDesktop from '../components/shared/skColoredContainerDesktop';
import SkH2Desktop from '../components/shared/skH2Desktop';
import { lettersH1Text } from '../lib/staticProps/lettersContent';
import { letterWriters } from '../lib/staticProps/letterWriters';
import { getLettersStaticProps } from '../lib/staticProps/lettersStatic';

export default function SkovorodaLettersPageDesktop({ allLettersFrom, receiversList }) {

  const uniqueLettersByToAndNumber = [];
  allLettersFrom.forEach(letter => {
    if (!uniqueLettersByToAndNumber.some(key => key.to == letter.to && key.number == letter.number)) {
      uniqueLettersByToAndNumber.push(letter);
    }
  });

  return <>
    <SkH1Desktop text={lettersH1Text} withBlueImage={true} />
    <SkColoredContainerDesktop pt={-20} pb={80}>
      {receiversList.map(receiver => {
        const writer = letterWriters.find(writer => writer.id === receiver.to);
        return <div key={receiver.to}>
          <SkH2Desktop text={`Листи від Сковороди до ${writer.genetiveName}`} mb={"lg"} />
          <Grid columns={8}>
            {uniqueLettersByToAndNumber.filter(letter => letter.to === receiver.to).map((letter, index) => {
              return <Grid.Col key={index} span={1}>
                <Link key={index} href={pathJoin(SkovorodaLettersFromPath, letter.id)}>
                  <AnimatedMailComponent uniqueId={letter.id} />
                  <Text>{`Лист №${letter.number}`}</Text>
                </Link>
              </Grid.Col>
            })}
          </Grid>
        </div>;
      })}
    </SkColoredContainerDesktop>
  </>
}

export async function getStaticProps(params) {
  return getLettersStaticProps(params);
}