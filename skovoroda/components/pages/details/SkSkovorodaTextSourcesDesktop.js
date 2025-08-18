

import { List, Space, Text } from "@mantine/core";
import SkH2Desktop from "../../shared/skH2Desktop";
import classes from './SkSkovorodaTextSourcesDesktop.module.scss';
import { useState } from "react";

export default function SkSkovorodaTextSourcesDesktop({data, textTitle}) {
  if (!data) return null;

  // Single state for all cards: expandedCardIndex (null or index)
  const [expandedCard, setExpandedCard] = useState(null);
  const handleExpandToggle = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const subHeader = textTitle ? `До твору ${textTitle}` : null;
  const anyExpanded = expandedCard !== null ? true : false;

  return (
    <div style={{ position: "relative" }}>
      <SkH2Desktop text={"Джерела Сковороди"} mb="0" className="h2-v2" />
      {subHeader && <Text className={`${classes.subHeader} font-ysabeau`}>{subHeader}</Text>}
      <Space h="xl" />
      <div className={classes.sourcesContainer}>
        {data.map((block, blockIndex) => (
          <SourceCard
            block={block}
            key={blockIndex}
            skKey={blockIndex}
            classes={classes}
            anyExpanded={anyExpanded}
            expanded={expandedCard === blockIndex}
            onExpand={() => handleExpandToggle(blockIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function SourceCard({ block, skKey, classes, expanded, onExpand, anyExpanded }) {
  if (!expanded) {
    if (anyExpanded) return <div key={skKey}></div>;
    return <div key={skKey} className={classes.sourceCard}>
      <div
        className={classes.sourceCardImage}
        style={{ backgroundImage: `url(${block.imageUrl})` }}
      />
      {/* Title */}
      <div className={classes.sourceCardTitle}>{block.title}</div>
      {/* Items block, flex bottom aligned and centered */}
      <div className={classes.sourceCardItemsBlock}>
        {block.items.filter(item => !item.isExpandedOnly).map((item, itemIndex) => (
          <div key={itemIndex} className={classes.sourceCardItem}>
            {item.iconType === "book" && (
              <img src="/images/icons/open-book-white.png" alt="Book Icon" className={classes.bookIcon} height={40} width={40} />
            )}
            <span className={classes.sourceCardItemText}>{item.text}</span>
          </div>
        ))}
      </div>
      {/* Expandable icon at bottom right */}
      {block.isExpandable && (
        <span className={classes.sourceCardExpandIconBottom} onClick={onExpand} style={{ cursor: 'pointer' }}>
          <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      )}
    </div>;
  }
  return <div key={skKey} className={classes.sourceCardExpanded}>
    <div
      className={classes.sourceCardImageExpanded}
      style={{ backgroundImage: `url(${block.imageUrl})` }}
    />
    {/* Expandable icon at top right */}
    <button className={classes.sourceCardExpandIconTop} onClick={onExpand}>
      <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
        <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
    {/* Title */}
    <div className={classes.sourceCardTitleExpanded}>{block.title}</div>
    {/* Items block, flex bottom aligned and centered */}
    <div className={classes.sourceCardItemsBlock}>
      {block.items.map((item, itemIndex) => {
        const result = [];
        result.push(<div key={itemIndex} className={classes.sourceCardItemExpanded}>
          { typeof item.text === "string" && (
            <span className={classes.sourceCardItemText}>{item.text}</span>
          )}
          { Array.isArray(item.text) && (
            <span className={classes.sourceCardItemText}>{ItemTextSpecial(item.text)}</span>
          )}
        </div>);
        if (item.sublist) {
          result.push(SublistSpecial(item.sublist, classes, itemIndex));
        }
        return result;
      }).flat()}
    </div>
    {/* Expandable icon at bottom right */}
    {block.isExpandable && (
      <span className={classes.sourceCardExpandIconBottom} onClick={onExpand}>
        <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M8 12L16 20L24 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    )}
  </div>;
}

function ItemTextSpecial(textArray) {
  if (!textArray) return null;
  return textArray.map((item, index) => {
    const isString = typeof item === "string";
    if (isString) return <span key={index}>{item}</span>;
    const className = item.type === 'underline-text' ? classes.underlineText : '';
    return <span key={index} className={className}>{item.text}</span>;
  });
}

function SublistSpecial(list, classes, skKey) {
  if (!list || !list.length) return null;
  return <List key={'sublist'+skKey} className={`${classes.formatTabs1} ${classes.sublist}`}>
    {list.map((text, i) => (
      <List.Item key={i}>{text}</List.Item>
    ))}
  </List>;
}