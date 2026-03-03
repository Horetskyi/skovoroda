import { Box, Container, Space, Title } from '@mantine/core';
import classes from './videoBlockMobile.module.scss';
import SkH2Mobile from '../../shared/skH2Mobile';
import { useYouTubeInteractionGate } from '../../../hooks/useYouTubeInteractionGate';
import { memo, useMemo } from 'react';

export const MusicBlockMobile = memo(function MusicBlockMobile({music, title}) {
  const isYouTubeActivated = useYouTubeInteractionGate();

  const embedUrls = useMemo(() => {
    if (!music) return [];
    return music.map(m => m.url.replace('watch?v=', 'embed/').split('&')[0] + '?rel=0&modestbranding=1');
  }, [music]);

  if (!music || !music.length) {
    return null;
  }

  return <>
    <SkH2Mobile text={title} />
    <Container>
      {music.map((m, index) => {
        const embedUrl = embedUrls[index];
        return <Box key={index} mt="lg" mb="lg">
          <Title order={3} ta={"left"} mb="md" fw={600}>{m.author}</Title>
          <Box className={classes.videoWrapper}>
            <iframe
              src={isYouTubeActivated ? embedUrl : undefined}
              title={m.author}
              loading="lazy"
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
});