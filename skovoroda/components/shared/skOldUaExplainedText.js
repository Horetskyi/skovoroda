import { Popover, Text } from "@mantine/core";
import classes from "./skOldUaExplainedText.module.scss";

export default function SkOldUaExplainedText({ explanations, text, key }) {
  
  const popoverText = getExplanationsElement(explanations);

  return <Popover position="top" withArrow shadow="md" offset={0}>
    <Popover.Target>
      <span key={key} className="sk-global-old-ua-text">{text}</span>
    </Popover.Target>
    <Popover.Dropdown>
      <div className={`${classes.popoverBox} sk-global-old-ua-text-inner readFont`}>{popoverText}</div>
    </Popover.Dropdown>
  </Popover>
}

function getExplanationsElement(explanations) {
  if (Array.isArray(explanations)) {
    return explanations.map((exp, index) => {
      return <p key={index}>{exp}</p>;
    });
  }
  return <span>{`Значення: \"${explanations}\"`}</span>;
}
