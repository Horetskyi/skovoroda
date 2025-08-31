import { Space, Text, Timeline } from "@mantine/core";
import classes from './skBioInfographicsDesktop.module.scss'; 
import SkH1Desktop from "./skH1Desktop";
import SkH2Desktop from "./skH2Desktop";
import SkColoredContainerDesktop from "./skColoredContainerDesktop";
import { getBioContent } from "./bioContent";
import SkMetaTextView from "./skMetaTextView";

export default function SkBioInfographicsDesktop({ }) {
  
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
      
      {args.detailsText 
        ? <Text c="black" className="normalContentText_lower" mt="sm" mb="xs">{args.detailsText}</Text>
        : null}

      {args.detailsTextParsed
        ? <>
          <Space h={"sm"}/>
          <SkMetaTextView metaText={args.detailsTextParsed} otherArgs={{isv2: true, plusClassName: "normalContentText_lower"}} />
          <Space h={"xs"}/>
        </>
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
    <SkColoredContainerDesktop color={"white"}>
      <SkH1Desktop text='Біографія'/>
      <SkH2Desktop text='Основні віхи життя Сковороди' mb="lg" mt="lg" />
      <Timeline 
        bulletSize={40} 
        lineWidth={2} 
        className="normalContentText normalContentText_withoutIndent" 
        active={1000}>
        {shortBioMoments.map(bioMoment => bioMomentTimelineItem(bioMoment))}
      </Timeline>
    </SkColoredContainerDesktop>
  </>
}
