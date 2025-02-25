import { Space, Text, Timeline } from "@mantine/core";
import classes from './skBioInfographicsDesktop.module.scss'; 
import { getBioContent } from "./bioContent";
import SkColoredContainerMobile from "./skColoredContainerMobile";
import SkH2Mobile from "./skH2Mobile";
import SkH1Mobile from "./skH1Mobile";
import SkTextContentBlockDesktop from "./skTextContentBlockDesktop";

export default function SkBioInfographicsMobile({ }) {
  
  const bioContent = getBioContent();
  const shortBioMoments = bioContent.shortBioMoments;

  function bioMomentTimelineItem(args) {
    
    const design = args.design;
    const background = `var(--mantine-color-${design.bg2.replace('.', '-')})`;

    return <Timeline.Item 
      bullet={design.icon}
      title={args.text}
      color={design.bg} 
      classNames={{itemTitle: classes.timelineItemTitle, itemBullet: classes.itemBullet, itemBody: classes.itemBody}}
      styles={{itemBody: {background: background}}} >
      
      {args.detailsTextParsed
        ? <>
          <Space h={"sm"}/>
          <SkTextContentBlockDesktop textContent={args.detailsTextParsed} plusClassName={"normalContentText_lower"} isv2={true} isMobile={true} />
          <Space h={"xs"}/>
        </>
        : null}

      {args.detailsText 
        ? <Text c="black" className="normalContentText_lower" mt="sm" mb="xs">{args.detailsText}</Text>
        : null}
      
      {args.timeText
        ? <Text c="gray.6" size="sm" fw={400} mt={4}>{args.timeText}
          {args.locationText
        ? <Text span ml={4} fw={400}>{"("+args.locationText+")"}</Text> 
        : null}
        </Text> 
        : null}

    </Timeline.Item>;
  }
  

  return <>
    <SkColoredContainerMobile color={"white"} px="sm" >
      <SkH1Mobile text='Біографія'/>
      <SkH2Mobile text='Основні віхи життя Сковороди' mb="lg" mt="lg" />
      <Timeline 
        ml={-4}
        bulletSize={40} 
        lineWidth={1.5} 
        className="normalContentText normalContentText_withoutIndent" 
        active={1000}>
        {shortBioMoments.map(bioMoment => bioMomentTimelineItem(bioMoment))}
      </Timeline>
    </SkColoredContainerMobile>
  </>
}
