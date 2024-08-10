import FountainSvg from "./skFountain.svg";
import { useEffect, useState } from "react";
import classes from './skFountain.module.scss'; 

export default function SkFountain({ isMobile }) {

  const [gsapLoaded, setGsapLoaded] = useState(false);

  // useEffect(() => {
  //   if (window.gsap) {
  //     setGsapLoaded(true);
  //   }
  // }, []);

  useEffect(() => {
    if (gsapLoaded) {
      return;
    }

    const loadGSAP = () => {
      if (gsapLoaded) {
        return;
      }
      console.log("CUSTOM: add gsap script {");
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      script.onload = () => setGsapLoaded(true);
      document.body.appendChild(script);
      console.log("CUSTOM: add gsap script }");
    };

    const handleScroll = () => {
      loadGSAP();
      window.removeEventListener('scroll', handleScroll); // Remove the listener after GSAP is loaded
    };

    console.log("CUSTOM: add gsap scroll event listener");
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [gsapLoaded]);

  useEffect(() => {

    if (!gsapLoaded) {
      return;
    }

    console.log("CUSTOM: gsap fountain");

    const svg = document.getElementById("fountain-svg");
    if (!svg.classList.contains(classes.fountainSvg)) {
      svg.classList.add(classes.fountainSvg);
    }

    if (svg.classList.contains("animated")) {
      return;
    }
    svg.classList.add('animated');

    const basicOffset = 32*3;
    const basicCssSelector = ".cls-2:nth-child(5n)";

    [0,1,2,3,4].forEach(index => {

      const cssSelector = (index === 0) ? basicCssSelector 
        : basicCssSelector.replaceAll("5n", "5n+"+index);
      
      const offset = basicOffset + index*10;
      
      gsap.to(cssSelector, {
        duration: 1, 
        repeat: -1,
        ease: "none",
        strokeDashoffset: offset,
      });
      
    });
  }, [gsapLoaded]);

  const width = isMobile ? "100%" : "900px";

  return <>
    <FountainSvg width={width} />
  </>;
}