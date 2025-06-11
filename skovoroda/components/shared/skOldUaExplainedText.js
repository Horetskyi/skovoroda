import { Popover, Text } from "@mantine/core";
import classes from "./skOldUaExplainedText.module.scss";

export default function SkOldUaExplainedText({ explanations, text, skKey }) {
  
  const popoverText = getExplanationsElement(explanations);

  return <Popover key={skKey} position="top" withArrow shadow="md" offset={0}>
    <Popover.Target>
      <span key={skKey} className="sk-global-old-ua-text">{text}</span>
    </Popover.Target>
    <Popover.Dropdown>
      <div key={skKey} className={`${classes.popoverBox} sk-global-old-ua-text-inner readFont`}>{popoverText}</div>
    </Popover.Dropdown>
  </Popover>
}

function getExplanationsElement(explanations) {
  if (Array.isArray(explanations)) {
    return explanations.map((exp, index) => {
      const text = "" + (index+1) + ". " + exp;
      return <p key={text}>{text}</p>;
    });
  }
  return <span key={explanations}>{`Значення: \"${explanations}\"`}</span>;
}
