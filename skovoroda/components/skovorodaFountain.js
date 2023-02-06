import FountainSvg from "./fountain.svg";
import { gsap } from "gsap/dist/gsap";
import { useEffect } from "react";

export default function SkovorodaFountain({}) {

  useEffect(() => {

    const svg = document.getElementById("fountain-svg");
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
  });

  return <>
    <FountainSvg width="900px" />
  </>;
}