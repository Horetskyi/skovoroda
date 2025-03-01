import AnimatedMailSvg from "./svgs/animatedMail.svg";
import { gsap } from "gsap/dist/gsap";
import { useEffect, useRef, useState } from "react";
import { Container } from "@mantine/core";
import classes from './animatedMailComponent.module.scss';

export default function AnimatedMailComponent({ uniqueId }) {
  
  const root = useRef();
  const uniqueClassName = "animated-mail-id-"+uniqueId;
  var [isPlayed, setIsPlayed] = useState(false);
  
  useEffect(() => {

    let ctx = gsap.context((self) => {
      
      let timeline = gsap.timeline({
        paused:true,
      });

      timeline
        .to('#env-lid', { 
          duration: 0.3, 
          scaleY:-1,
          y: 1.5, 
        })
        .fromTo('#env-paper', 0.4, {
          transformOrigin: "50% 100%",
          scaleY:0,
        },{
          scaleY: 1,
        }, "=-0.25")
        .staggerFromTo(['#env-line-1', '#env-line-2', '#env-line-3'], 0.3, {
          transformOrigin: "50% 50%",
          scaleX: 0
        },{
          scaleX: 1,
        },	-0.09);

      const mailIcon = document.querySelector(`.${uniqueClassName}`);
      mailIcon.addEventListener("mouseenter", () => {
        timeline.play();
      });
      mailIcon.addEventListener("mouseleave", () => {
        timeline.reverse();
      });

    }, root);


    return () => ctx.revert();

  }, [uniqueClassName]);

 
  return <Container ref={root} onClick={() => setIsPlayed(true) } className={uniqueClassName + " " + classes.container} >
    <AnimatedMailSvg width="40px" className={isPlayed ? "played" : "notplayed"} />
  </Container>
}
