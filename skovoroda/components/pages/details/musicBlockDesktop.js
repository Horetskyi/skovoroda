import React from 'react';
import { Box, Container, Space, Title } from '@mantine/core';
import SkH2Desktop from '../../shared/skH2Desktop';
import classes from './videoBlockDesktop.module.scss';

export function MusicBlockDesktop({music, title}) {
  if (!music || !music.length) {
    return null;
  }

  return <>
    <SkH2Desktop text={title} />
    <Container>
      {music.map((m, index) => {
        const embedUrl = m.url.replace('watch?v=', 'embed/').split('&')[0]+ '?rel=0&modestbranding=1'; // Clean embed URL
        return <Box key={index} mt="lg" mb="lg">
          <Title order={3} ta={"left"} mb="md" fw={600}>{m.author}</Title>
          <Box className={classes.videoWrapper}>
            <iframe
              src={embedUrl}
              title={m.author}
              style={{
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Box>;
      })}
    </Container>
    <Space h="md" />
  </>
}