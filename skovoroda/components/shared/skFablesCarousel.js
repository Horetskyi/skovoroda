import React from "react";
import { Container, Space } from "@mantine/core";
import { IconCircleChevronLeft, IconCircleChevronRight } from "@tabler/icons-react";
import SkImage from "./skImage";
import classes from "./skFablesCarousel.module.scss";
import { SkImagesArray } from "../../lib/data/images/skImages";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SkTextLink from "./skTextLink";
import { getFableLinkTitle, pathJoin, SkovorodaFablesPath } from "../../lib/skovorodaPath";

export default function SkFablesCarousel({ allFables, isMobile }) {

  const sliderSettings = {
    responsive: [{
      breakpoint: { max: 30000, min: 0 },
      items: 1
    }],
  };

  const imagesCarousel = SkImagesArray.filter(image => image.type === "fable").map((image, index) => {
  
    image = {...image};
    const width = isMobile ? (400 * 0.6) : 400;
    const height = isMobile ? (578 * 0.6) : 578; 
    image.height = height;
    image.width = width;

    const fable = allFables.find(fable => fable.fableNumber === image.fableNumber);
    const title = `${image.fableNumber} - ${fable.fableTitle}`;
    const href = pathJoin(SkovorodaFablesPath, fable.urlId);

    return <div key={image.imageUrl} className={classes.carouselItemContainer}>
      <Space h={"md"}/>
      <div className={classes.carouselImageContainer}>
        <SkImage image={image} height={height} width={width} optimize={false} 
          priority={index === 0}
          alt={image.alt} 
          title={image.title}
          gentlyShadow={true} />
        <SkTextLink 
          ta={"center"} 
          className={`h2-font ${classes.carouselText}`} 
          px={"md"}
          text={title} title={getFableLinkTitle(fable)} href={href} onHoverStylesOnly={true} />
      </div>
      <Space h={"md"}/>
    </div>
  });

  return (
    <Container w={isMobile ? "100%" : 640} p={0} mx={isMobile ? 0 : undefined} mt={"xl"} mb={isMobile ? 0 : "md"}>
      <Slider 
        h={isMobile ? 500 : 700} 
        {...sliderSettings} 
        arrows={true} 
        dots={false}
        infinite={true}
        draggable={true}
        speed={500}
        slidesToShow={1}
        nextArrow={<div>
          <IconCircleChevronRight width={36} height={36} strokeWidth={1} color="#2c2c2c" className={classes.carouselSlickRight} />
        </div>}
        prevArrow={<div>
          <IconCircleChevronLeft width={36} height={36} strokeWidth={1} color="#2c2c2c" className={classes.carouselSlickLeft} />
        </div>}
        centerMode={true} 
        waitForAnimate={false}>
        {imagesCarousel}
      </Slider>
    </Container>
  );
}