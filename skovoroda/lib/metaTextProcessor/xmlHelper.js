/**
 * Parses a string with <meta ...>...</meta> tags (with arbitrary attributes and nesting)
 * and returns an array of objects:
 *   { text: "...", start: <number> }
 *   { text: "...", meta: { ...attributes... }, start: <number>, innerParsedTextArray: [...] }
 */
export function xmlHelper_parseMetaTagsWithTextAndNesting(input, visualPos = 0) {

  if (!input || !input.length || typeof input !== "string") return null;

  input = preprocessBibleTags(input);
  
  const result = [];
  let i = 0;
  let lastTextIndex = 0;
  let currentVisualPos = visualPos;

  while (i < input.length) {
    // Find next <meta or </meta>
    const openIdx = input.indexOf('<meta', i);
    const closeIdx = input.indexOf('</meta>', i);

    // If no more tags, push remaining text and break
    if (openIdx === -1 && closeIdx === -1) {
      if (lastTextIndex < input.length) {
        const text = input.slice(lastTextIndex);
        if (text) {
          result.push({ text, start: currentVisualPos });
          currentVisualPos += text.length;
        }
      }
      break;
    }

    // If next is opening tag
    if (openIdx !== -1 && (openIdx < closeIdx || closeIdx === -1)) {
      // Push text before tag
      if (openIdx > lastTextIndex) {
        const text = input.slice(lastTextIndex, openIdx);
        if (text) {
          result.push({ text, start: currentVisualPos });
          currentVisualPos += text.length;
        }
      }
      // Parse attributes
      const tagEnd = input.indexOf('>', openIdx);
      if (tagEnd === -1) break; // malformed
      const attrString = input.slice(openIdx + 5, tagEnd);
      const attrs = parseAttributesForArray(attrString);

      // Find matching closing </meta> for this <meta>
      let depth = 1;
      let searchIdx = tagEnd + 1;
      while (depth > 0) {
        const nextOpen = input.indexOf('<meta', searchIdx);
        const nextClose = input.indexOf('</meta>', searchIdx);
        if (nextClose === -1) break; // malformed
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchIdx = nextOpen + 5;
        } else {
          depth--;
          searchIdx = nextClose + 7;
        }
      }
      const contentEnd = searchIdx - 7;
      const innerContent = input.slice(tagEnd + 1, contentEnd);

      // Recursively parse inner content, passing currentVisualPos
      const innerParsed = xmlHelper_parseMetaTagsWithTextAndNesting(innerContent, currentVisualPos);
      // Compose text for this meta (flatten innerParsed to text)
      const metaText = innerParsed.map(x => x.text).join('');

      // Compose meta object
      const metaObj = {
        text: metaText,
        start: currentVisualPos,
        meta: attrs,
      };
      if (innerParsed.length > 1 || (innerParsed.length === 1 && innerParsed[0].meta)) {
        metaObj.innerParsedTextArray = innerParsed;
      }

      result.push(metaObj);
      currentVisualPos += metaText.length;

      i = searchIdx;
      lastTextIndex = i;
      continue;
    }

    // If next is closing tag (shouldn't happen at top level, but just in case)
    if (closeIdx !== -1 && (closeIdx < openIdx || openIdx === -1)) {
      if (closeIdx > lastTextIndex) {
        const text = input.slice(lastTextIndex, closeIdx);
        if (text) {
          result.push({ text, start: currentVisualPos });
          currentVisualPos += text.length;
        }
      }
      i = closeIdx + 7;
      lastTextIndex = i;
      continue;
    }
  }
  return result;
}

function parseAttributesForArray(attrString) {
  const attrs = {};
  const attrRegex = /([a-zA-Z0-9_\-:]+)\s*=\s*"([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(attrString))) {
    const key = match[1];
    const value = match[2];
    if (attrs[key] === undefined) {
      attrs[key] = value;
    } else if (Array.isArray(attrs[key])) {
      attrs[key].push(value);
    } else {
      attrs[key] = [attrs[key], value];
    }
  }
  for (const k in attrs) {
    if (Array.isArray(attrs[k]) && attrs[k].length === 1) {
      attrs[k] = attrs[k][0];
    }
  }
  return Object.keys(attrs).length ? attrs : undefined;
}

// Handles:
// [BIBLE]CODE[X]text[BIBLE]  => <meta bible="CODE">text</meta>
// [BIBLE]CODE[X]text[X]translation[BIBLE] => <meta bible="CODE" translation="translation">text</meta>
function preprocessBibleTags(input) {

  // First, handle the case with translation
  input = input.replace(
    /\[(BIBLE|META)\](.*?)(?:\[X\](.*?)(?:\[X\](.*?))?)?\[\1\]/g,
    (match, f, code, text, translation) => {
      if (!translation || !translation.length) {
        return `<meta bible="${code}">${text}</meta>`;
      }
      return `<meta bible="${code}" translation="${translation}">${text}</meta>`
    }
  );

  return input;
}
