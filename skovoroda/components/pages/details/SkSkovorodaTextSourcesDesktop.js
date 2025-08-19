

import { List, Space } from "@mantine/core";
import classes from './SkSkovorodaTextSourcesDesktop.module.scss';
import { useState } from "react";
import SkH2DesktopV2 from "../../shared/skH2DesktopV2";

export default function SkSkovorodaTextSourcesDesktop({data, textTitle, isMobile}) {
  
  const [isBooksTableDisplayed, setIsBooksTableDisplayed] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  
  if (!data) return null;

  const handleExpandToggle = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const subHeader = textTitle ? `До твору: «${textTitle}»` : null;
  const anyExpanded = expandedCard !== null ? true : false;

  return (
    <div style={{ position: "relative" }}>
      <SkH2DesktopV2 text={"Джерела Сковороди"} mb="0" subHeader={subHeader} />
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
            isBooksTableDisplayed={isBooksTableDisplayed}
            setIsBooksTableDisplayed={setIsBooksTableDisplayed}
          />
        ))}
      </div>
    </div>
  );
}

function SourceCard({ 
  block, 
  skKey, 
  classes, 
  expanded, 
  onExpand, 
  anyExpanded, 
  isBooksTableDisplayed,
  setIsBooksTableDisplayed
}) {
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

  const booksTableItem = block.items.find(item => item && item.text === "booksTable");
  const booksTable = booksTableItem ? booksTableItem.booksTable : null;

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
    
    <div className={classes.itemsWrapper}>

      {/* Items block, flex bottom aligned and centered */}
      <div className={classes.sourceCardItemsBlock}>
        {block.items.filter(item => !item.isCollapsedOnly).map((item, itemIndex) => {
          const result = [];
          if (item.text !== "booksTable") {
            result.push(<div key={itemIndex} className={classes.sourceCardItemExpanded}>
              { typeof item.text === "string" && (
                <span className={classes.sourceCardItemText}>{item.text}</span>
              )}
              { Array.isArray(item.text) && (
                <span className={classes.sourceCardItemText}>{ItemTextSpecial(item.text)}</span>
              )}
            </div>);
          } else {
            if (booksTable && !isBooksTableDisplayed) {
              result.push();
            }
          }
          if (item.sublist) {
            result.push(SublistSpecial(item.sublist, classes, itemIndex));
          }
          return result;
        }).flat()}
      </div>

      {(isBooksTableDisplayed && booksTable) && <div className={classes.booksTableSection}>
        <div>
          <button className={classes.button} onClick={() => setIsBooksTableDisplayed(false)}>Сховати всі цитовані книги</button>
        </div>
        {BooksTable(booksTable)}
      </div>}
      {(!isBooksTableDisplayed && booksTable) && <div className={classes.booksTableSection}>
        <button className={classes.button} onClick={() => setIsBooksTableDisplayed(true)}>Показати всі цитовані книги</button>
      </div>}

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

function BooksTable(tableData) {
  if (!tableData || !tableData.length) return null;
  const rows = tableData.map((item, index) => (
    <tr key={index}>
      <td>{item.bookName}</td>
      <td>{item.citationsCount}</td>
    </tr>
  ));
  return (
    <table className={classes.booksTableCompact} key="books-table">
      <thead>
        <tr>
          <th>Книги</th>
          <th>Цитат</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}