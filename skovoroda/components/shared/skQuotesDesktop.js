
import { Flex, Text } from "@mantine/core";
import classes from "./skQuotesDesktop.module.scss";
import SkRelatedTags from "./skRelatedTags";

function Quote(quote, text, index, themes) {
  const relatedSources = quote.shortName ? [quote] : [];
  const key = "quote_" + (quote.translatorId ? quote.translatorId : "")  + "_" + index;
  const anyTags = ((themes && themes.length) || relatedSources.length);
  return <div key={key}>
    <Text className="readFont normalContentText">{text}</Text>
    {anyTags ? <div className={classes.quoteTags}>
      <SkRelatedTags relatedSources={relatedSources} themes={themes} />
      </div> : null}
  </div>
}

export function SkQuotesDesktop({ quotes }) {
  if (!quotes || !quotes.length) {
    return null;
  }
  if (Array.isArray(quotes) && quotes[0].texts) {
    quotes = quotes.flatMap(q => q.texts);
  }
  return <Flex direction="column" gap="lg" mb="lg" className={classes.quotesContainer}>
    { quotes.map((text, index) => {
      var themes = [];
      const quote = text;
      if (typeof text === "object") {
        if (text.themes && Array.isArray(text.themes)) {
          themes = text.themes;
        }
        text = text.text;
      }
      return Quote(quote, text, index, themes);
    })}
  </Flex>
}