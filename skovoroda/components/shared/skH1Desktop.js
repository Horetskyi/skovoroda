import { Title } from "@mantine/core";
import classes from './skH1Desktop.module.scss'; 
import { useRef, useEffect } from "react";

export default function SkH1Desktop({ text, color, maxWidth, fontSize,
  isV2, 
  disableBackground, 
  withBlueImage, 
  bgLeftMargin,
  isCurved 
}) {

  if (isCurved) return <CurvedH1 text={text} color={color} fontSize={fontSize} style={{ maxWidth: maxWidth ? `${maxWidth}px` : '100%' }} className={classes.curvedH1Container} />;

  let styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }
  if (maxWidth) {
    styleObj.maxWidth = `${maxWidth}px`;
  }
  if (fontSize) {
    styleObj.fontSize = `${fontSize}px`;
  }
  var imageClassName = classes.titleH1;
  if (isV2) {
    imageClassName = disableBackground ? classes.titleH1V2_noBg : classes.titleH1V2;
  }
  var bgSt = {};
  if (withBlueImage) {
    imageClassName = classes.titleH1V2_withBg;
    if (bgLeftMargin) {
      bgSt.marginLeft = `${bgLeftMargin}px`;
    }
  }
  const h1Result = <Title order={1} mx={"auto"} ta={"center"} className={imageClassName} style={styleObj}>
    {text}
  </Title>;
  if (withBlueImage) {
    return <div className={classes.topContainer}>
      <div className={classes.titleBgImageContainer} style={bgSt}>
        <img src="/images/Blue H1.webp" alt="Blue Background" className={classes.titleBgImage} />
      </div>
      {h1Result}
    </div>
  }
  return h1Result;
}

/* EXAMPLE IMPLEMENTATION:
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 549.92 156.63">
  <defs>
    <style>
      path {
        fill: transparent;
      }
      text {
        fill: #FF9800;
      }
      .cls-1 {
        stroke: black;
      }
      .cls-1, .cls-2 {
        font-family: Ysabeau-Medium, Ysabeau;
        font-size: 32px;
        font-variation-settings: 'wght' 500;
        font-weight: 500;
        text-align: 'center';
      }
    </style>
  </defs>
  <g id="h1-lines">
  <path class="cls-1" id="line-1" d="M.34,16.57c22.58,20.42,125.84,54.79,185.14,72.15,73.04,21.38,133.49,9.7,164,3.43,59.59-12.25,165.9-47.16,194.86-66.44"/>
  <path class="cls-1" id="line-2" d="M.34,61.8c22.58,20.42,125.84,54.79,185.14,72.15,73.04,21.38,133.49,9.7,164,3.43,59.59-12.25,165.9-47.16,194.86-66.44"/>
  </g>
  <text>
    <textPath href="#line-1" class="cls-2" startOffset="50%" text-anchor="middle"></textPath>
    <textPath href="#line-2" class="cls-2" startOffset="50%" text-anchor="middle"></textPath>
  </text>
</svg>
<script>
  // Roughly fill line 1 up to ~90% of its path capacity, rest goes to line 2
  function splitAcrossTwoPaths(fullText, tp1, tp2, ratio = 0.9) {
    const words = fullText.trim().split(/\s+/);
    const measure = txt => {
      tp1.textContent = txt || '\u200b';            // zero-width to avoid 0 length
      return tp1.getComputedTextLength();
    };
    // Path lengths (capacity correlates with length)
    const L1 = document.querySelector('#line-1').getTotalLength();
    const goal = L1 * ratio;

    let line1 = '';
    for (let i = 0; i < words.length; i++) {
      const probe = (line1 ? line1 + ' ' : '') + words[i];
      if (measure(probe) > goal) {                  // stop before overflow
        const line2 = words.slice(i).join(' ');
        return [line1, line2];
      }
      line1 = probe;
    }
    return [line1, ''];
  }

  window.addEventListener('DOMContentLoaded', () => {
    const tp1 = document.querySelector('textPath[href="#line-1"]');
    const tp2 = document.querySelector('textPath[href="#line-2"]');
    const text ='Пѣснь 1-я ("Боится народ сойти гнить во гроб...")';
    const [l1, l2] = splitAcrossTwoPaths(text, tp1, tp2);
    console.log("l1", l1, "l2", l2);
    tp1.textContent = l1;
    tp2.textContent = l2;
  });
</script>
*/

function CurvedH1({ text, color = "#FF9800", fontSize = 32, ratio = 1, style = {}, className = "" }) {
  const tp1Ref = useRef(null);
  const tp2Ref = useRef(null);
  const path1Ref = useRef(null);

  // Split text across two paths based on path length and rendered text length
  useEffect(() => {
    const tp1 = tp1Ref.current;
    const tp2 = tp2Ref.current;
    const path1 = path1Ref.current;
    if (!tp1 || !tp2 || !path1 || !text) return;

    // Helper to measure text length on the path
    const measure = (txt) => {
      tp1.textContent = txt || '\u200b';
      return tp1.getComputedTextLength();
    };
    const L1 = path1.getTotalLength();
    const goal = L1 * ratio;
    const words = text.trim().split(/\s+/);
    let line1 = '';
    for (let i = 0; i < words.length; i++) {
      const probe = (line1 ? line1 + ' ' : '') + words[i];
      if (measure(probe) > goal) {
        const line2 = words.slice(i).join(' ');
        tp1.textContent = line1;
        tp2.textContent = line2;
        return;
      }
      line1 = probe;
    }
    tp1.textContent = line1;
    tp2.textContent = '';
  }, [text, ratio]);

  // Inline styles for SVG text
  const svgFont = {
    fontFamily: 'Ysabeau-Medium, Ysabeau',
    fontSize,
    fontVariationSettings: "'wght' 500",
    fontWeight: 500,
    textAlign: 'center',
    fill: color,
  };


  // Downward (bottom) curves: control points below the endpoints
  const flatPath1 = "M10,40 Q275,80 540,40";
  const flatPath2 = "M10,90 Q275,130 540,90";

  return (
    <h1 style={{ margin: 0, ...style }} className={className}>
      <svg
        viewBox="0 0 549.92 156.63"
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%' }}
        aria-label={text}
      >
        <g id="h1-lines">
          <path
            className="cls-1"
            id="line-1"
            ref={path1Ref}
            d={flatPath1}
            style={{ fill: 'transparent', stroke: 'transparent' }}
          />
          <path
            className="cls-1"
            id="line-2"
            d={flatPath2}
            style={{ fill: 'transparent', stroke: 'transparent' }}
          />
        </g>
        <text>
          <textPath
            href="#line-1"
            className="cls-2"
            ref={tp1Ref}
            startOffset="50%"
            textAnchor="middle"
            style={svgFont}
          />
          <textPath
            href="#line-2"
            className="cls-2"
            ref={tp2Ref}
            startOffset="50%"
            textAnchor="middle"
            style={svgFont}
          />
        </text>
      </svg>
    </h1>
  );
}