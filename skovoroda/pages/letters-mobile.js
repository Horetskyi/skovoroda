import { Grid, Text } from '@mantine/core';
import Link from 'next/link';
import AnimatedMailComponent from '../components/animatedMailComponent';
import { pathJoin, SkovorodaLettersFromPath } from '../lib/skovorodaPath';
import { lettersH1Text } from '../lib/staticProps/lettersContent';
import { letterWriters } from '../lib/staticProps/letterWriters';
import { getLettersStaticProps } from '../lib/staticProps/lettersStatic';
import SkH1Mobile from '../components/shared/skH1Mobile';
import SkColoredContainerMobile from '../components/shared/skColoredContainerMobile';
import SkH2Mobile from '../components/shared/skH2Mobile';

export default function SkovorodaLettersPageMobile({ allLettersFrom, receiversList }) {

  const uniqueLettersByToAndNumber = [];
  allLettersFrom.forEach(letter => {
    if (!uniqueLettersByToAndNumber.some(key => key.to == letter.to && key.number == letter.number)) {
      uniqueLettersByToAndNumber.push(letter);
    }
  });

  return <>
    <SkH1Mobile text={lettersH1Text} />
    <SkColoredContainerMobile>
      {receiversList.map(receiver => {
        const writer = letterWriters.find(writer => writer.id === receiver.to);
        return <div key={receiver.to}>
          <SkH2Mobile text={`Листи від Сковороди до ${writer.genetiveName}`} mb={"lg"} />
          <Grid columns={3} px={"md"}>
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
    </SkColoredContainerMobile>
  </>
}

export async function getStaticProps(params) {
  return getLettersStaticProps(params);
}