import { Card, Container, createStyles, Slider, Space, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import SkovorodaBioMapComponent from "../components/skovorodaBioMapComponent";
import FirstHouseComponent from "../components/firstHouseComponent";
import { skovorodaPlaces, SkovorodaTravelData } from "../lib/data/skovorodaTravelData";
import { CSSPlugin } from "gsap";

const useStyles = createStyles((theme) => ({
  
  svgMapContainer: {
    transform: "translateZ(0)",
  },

  svgMap: {
    position: "absolute",
    overflow: "visible  !important",

    "*": {
      visibility: "visible",
    }
  },

}));

export default function HSBioExperimentalPageDesktop({ }) {
  
  const { classes } = useStyles();

  // Constants
  const maxDuration = 100;
  const mapId = "skovoroda-bio-map";
  const mapIdSelector = "#" + mapId;

  // Given Data
  const timePoints = SkovorodaTravelData.timePoints;
  const beginYear = timePoints[0].date.year;
  const endYear = timePoints[timePoints.length - 1].date.year;
  const beginTimeSliderValue = dateToDays(beginYear, timePoints[0].date);
  const endTimeSliderValue = dateToDays(beginYear, timePoints[timePoints.length - 1].date);
  const cameraPropertiesMap = new Map([
    [ skovorodaPlaces.chornuhy.id, {
      scale: 18,
      top: -2461,
      left: 1121,
    }],
    [ skovorodaPlaces.kyivo_mohylyanska_akademia.id, {
      scale: 18,
      top: -2461,
      left: 1252,
    }],
  ]);
  const defaultCameraProperties = cameraPropertiesMap.get(skovorodaPlaces.kyivo_mohylyanska_akademia.id);

  // States
  const [timeSliderValue, setTimeSliderValue] = useState(beginTimeSliderValue);

  // Calculated Data
  const cameraAnimations = [];
  let lastPlaceId = "";
  timePoints.forEach(timePoint => {
    
    if (!timePoint.place) {
      return;
    }
    
    const placeId = timePoint.place.id;
    if (!placeId || (placeId == lastPlaceId)) {
      return;
    }
    
    const cameraAnimation = cameraPropertiesMap.has(placeId) 
      ? cameraPropertiesMap.get(placeId) 
      : defaultCameraProperties;
    
      if (cameraAnimations.length === 0) {
      cameraAnimations.push({
        animation: cameraAnimation,
        timePoint: timePoint,
        startPosition: 0,
        duration: maxDuration,
      });
    }
    else {
      const lastCameraAnimation = cameraAnimations[cameraAnimations.length - 1];
      lastCameraAnimation.duration = getDurationBeetweenPoints(lastCameraAnimation.timePoint, timePoint); 
      const startPosition = lastCameraAnimation.duration + lastCameraAnimation.startPosition;
      cameraAnimations.push({
        animation: cameraAnimation,
        timePoint: timePoint,
        startPosition: startPosition,
        duration: maxDuration - startPosition,
      });
    }
  });

  function daysToDuration(days) {
    return (days * maxDuration) / (endTimeSliderValue - beginTimeSliderValue);
  }

  function getDurationBeetweenPoints(timePointA, timePointB) {
    const daysB = dateToDays(beginYear, timePointB.date);
    const daysA = dateToDays(beginYear, timePointA.date);
    const deltaDays = daysB - daysA;
    const duration = daysToDuration(deltaDays);
    return duration;
  }

  function getPlaceFocusByTimeSliderValue(value) {
    const pointInDurationTime = daysToDuration(value);
    const foundPlace = cameraAnimations.find(placeFocus => {
      return placeFocus.startPosition <= pointInDurationTime && 
        (placeFocus.startPosition + placeFocus.duration) >= pointInDurationTime;
    });
    return foundPlace ? foundPlace : cameraAnimations[0];
  }

  function getSvgCirclePosition(id) {
    const element = document.getElementById(id);
    return {
      x: element.cx.baseVal.value, 
      y: element.cy.baseVal.value,
    };
  }

  function initializeTimeline() {
    
    CSSPlugin.defaultSmoothOrigin = true;

    const timeline = gsap.timeline({paused: true, defaults: { ease: "none" }});
    document.bioTimeline = timeline;

    // Set whole animation duration
    timeline.fromTo("#mock", { scale: 1 }, { duration: maxDuration, scale: 1 }, 0);
    
    // Set "Moving Camera" effect
    cameraAnimations.forEach((camera, index) => {
      const prevCamera = cameraAnimations[(index === 0 ? 0 : index - 1)];
      timeline.fromTo(
        mapIdSelector, 
        prevCamera.animation, 
        {
          ...camera.animation,
          duration: camera.duration,
        }, 
        camera.startPosition); 
    });
  }

  useEffect(() => {
    if (!document.bioTimeline) {
      document.bioTimeline = true;
      console.log("Initialization: Bio timeline");
      initializeTimeline();
      document.bioTimeline.progress(0.1);
    }
  });

  function setTimeSliderValueFacade(timeSlideValue) {
    
    if (!document.bioTimeline) {
      return;
    }
    
    setTimeSliderValue(timeSlideValue);
    
    const progressValue = (timeSlideValue - beginTimeSliderValue) / (endTimeSliderValue - beginTimeSliderValue);
    document.bioTimeline.progress(progressValue);
  }

  return <Container>
    <Title order={1} mb="md">Григорій Савич Сковорода - Біографія</Title>

    <Card w={900} h={500} mb="xl" p="0" withBorder={true}>

      <div id="skovoroda-bio-map-container" className={classes.svgMapContainer}>
        <SkovorodaBioMapComponent className={classes.svgMap} id="skovoroda-bio-map" width="900px" height="500px" />
      </div>
  
      <FirstHouseComponent id="first-house" />
      <div id="mock"></div>
      
    </Card>

    <Slider 
        label={(value) => `${daysToYear(beginYear, value)} рік`} 
        labelAlwaysOn={true}
        marks={[
          { value: beginTimeSliderValue, label: `${beginYear} рік` },
          { value: endTimeSliderValue, label: `${endYear} рік` },
        ]}
        precision={2}
        min={beginTimeSliderValue}
        max={endTimeSliderValue}
        value={timeSliderValue}
        step={0.01}
        onChange={(value) => setTimeSliderValueFacade(value)}
      />
    
  </Container>
}

// Auxiliary
function dateToDays(beginYear, date) {
  if (!date || !date.year) {
    return 0;
  }
 
  const date2 = new Date(date.year, 
    date.month ? (date.month - 1) : 0, 
    date.day ? date.day : 1);

  const date1 = new Date(beginYear, 0);

  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
}

// Auxiliary
function daysToYear(beginYear, days) {
  return beginYear + Math.round(days / 365) - 1;
}