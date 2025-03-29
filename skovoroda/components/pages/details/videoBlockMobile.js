import React from 'react';
import { Box, Text, Title } from '@mantine/core';
import classes from './videoBlockMobile.module.scss';
import SkH2Mobile from '../../shared/skH2Mobile';

export function VideoBlockMobile(treatise) {
  if (!treatise || !treatise.videos || !treatise.videos.length) {
    return null;
  }

  return treatise.videos.map((video, index) => {
    const embedUrl = video.url.replace('watch?v=', 'embed/').split('&')[0]; // Clean embed URL

    return <>
      <SkH2Mobile text="Відео" />
      <Box key={index} mt="lg" mb="lg">
        <Title order={3} ta={"left"}>{video.title}</Title>
        <Text className="normalContentText normalContentText_withoutIndent" mt="md" mb="lg">
          {video.description}
        </Text>
        <Box className={classes.videoWrapper}>
          <iframe
            src={embedUrl}
            title={video.title}
            style={{
              width: '100%',
              height: '100%',
              border: 0,
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </Box>
    </>;
  });
}