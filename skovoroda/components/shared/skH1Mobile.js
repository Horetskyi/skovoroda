
import { Title } from "@mantine/core";
import classes from './skH1Mobile.module.scss'; 

export default function SkH1Mobile({ text, color, withBlueImage, bgLeftMargin, mb, id }) {
  let styleObj = {};
  if (color && color.length) {
    styleObj.color = color;
  }

  // Use a separate class if withBlueImage is true, else default
  let imageClassName = classes.titleH1;
  let bgSt = {};
  if (withBlueImage) {
    // You may want to add a new class for mobile if needed
    imageClassName = classes.titleH1; // or classes.titleH1_withBg if you add it
    if (bgLeftMargin) {
      bgSt.marginLeft = `${bgLeftMargin}px`;
    }
  }

  const h1Result = (
    <Title 
      order={1} 
      px="lg" mx={"auto"} ta={"center"} 
      className={imageClassName} 
      style={styleObj}
      mb={mb}
      id={id}
    >
      {text}
    </Title>
  );

  if (withBlueImage) {
    return (
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '-1rem',
          left: '0.5rem',
          zIndex: -1,
          height: 'calc(100% + 3.2rem)'
        }}>
          <img src="/images/Blue H1.webp" alt="Blue Background" style={{ width: '100%', opacity: 0.3, height: '100%', objectFit: 'fill', transform: 'scaleY(-1)' }} />
        </div>
        {h1Result}
      </div>
    );
  }
  return h1Result;
}