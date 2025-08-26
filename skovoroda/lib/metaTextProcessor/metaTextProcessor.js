
export function metaTextProcessor(content, isOldUaText) {

  // VALIDATION {
  if (!content || !content.trim() || typeof content !== "string") return [];
  // VALIDATION }

  // OLD {
  const parsedContent = [];
  const parsedMainSection = [];
  const parsedAfterMainSection = [];
  let lastNoteNumber = undefined;
  let isMainSection = false;
  let isMainSectionMode = false;
  let isAllIsList = false;
  let lastBibleCode = null;
  let lastBibleType = null;
  // OLD }

  content.split('\n').forEach(line => {

    // LINE BASICS {
    const isEmptyLine = !line || !(line.trim().length);
    const lineObject = { 
      text: line,
      isEmptyLine: isEmptyLine
    };
    // LINE BASICS }

    // NEW CODE {
    // parse all <meta link="https://example.com/">long <meta f="i" f="b">text</meta> here</meta> 
    // NEW CODE }


    // OLD CODE {
    TextLineFormats.some(lineFormat => {
      if (lineObject.text.includes(lineFormat.formatInFile)) {
        lineObject.text = lineObject.text.replace(lineFormat.formatInFile, "").trim();
        lineObject.format = lineFormat.format;
        return true;
      }
      return false;
    });

    if (lastNoteNumber) {
      lineObject.noteNumber = lastNoteNumber;
    }

    if (lineObject.text.includes("[AllIsList]")) {
      isAllIsList = true;
      return;
    }

    var isCharacterFound = false;
    if (lineObject.text.includes("[CHARACTER]")) {
      const linkRegex = /\[CHARACTER\](.*?)(?:\[X\](.*?))?\[CHARACTER\]/g;
      const matches = [...lineObject.text.matchAll(linkRegex)];
      if (matches.length > 0) {
        const parts = [];
        let lastIndex = 0;
    
        matches.forEach(match => {
          const characterId = match[1];
          const text = match[2];
          const startIndex = match.index;
          const url = getCharacterPath(characterId);
          
          // console.log("Found character link in text:", characterId, text, startIndex, url);
          isCharacterFound = true;

          // Add text before the link
          if (startIndex > lastIndex) {
            const beforeLink = lineObject.text.substring(lastIndex, startIndex);
            if (beforeLink && beforeLink.length) {
              parts.push({ text: beforeLink });
            }
          }
    
          // Add the link
          parts.push({ text, url, isLink: true });
    
          // Update the last index
          lastIndex = startIndex + match[0].length;
        });
    
        // Add text after the last link
        const afterLink = lineObject.text.substring(lastIndex);
        if (afterLink && afterLink.length) {
          parts.push({ text: afterLink });
        }
    
        // Update lineObject.text with the processed parts
        lineObject.text = parts;
      }
    }

    if (lineObject.text.includes(NOTE_NUMBER_FORMAT)) {
      const splitByNoteNumber = lineObject.text.split(NOTE_NUMBER_FORMAT);
      lineObject.noteNumber = splitByNoteNumber[1].trim();
      lineObject.isNoteBeginning = true;
      lineObject.text = splitByNoteNumber[2].trim();
      lastNoteNumber = lineObject.noteNumber;
    }

    if (lineObject.text.includes("[LINK]")) {
      const linkRegex = /\[LINK\](.*?)(?:\[LINK_SEPARATOR\](.*?))?\[LINK\]/g;
      const matches = [...lineObject.text.matchAll(linkRegex)];
      if (matches.length > 0) {
        const parts = [];
        let lastIndex = 0;
    
        matches.forEach(match => {
          const url = match[1];
          const text = match[2] || url;
          const startIndex = match.index;
    
          // Add text before the link
          if (startIndex > lastIndex) {
            const beforeLink = lineObject.text.substring(lastIndex, startIndex);
            if (beforeLink && beforeLink.length) {
              parts.push({ text: beforeLink });
            }
          }
    
          // Add the link
          parts.push({ text, url, isLink: true });
    
          // Update the last index
          lastIndex = startIndex + match[0].length;
        });
    
        // Add text after the last link
        const afterLink = lineObject.text.substring(lastIndex);
        if (afterLink && afterLink.length) {
          parts.push({ text: afterLink });
        }
    
        // Update lineObject.text with the processed parts
        lineObject.text = parts;
      }
    }

    if (lineObject.text.includes("[BIBLE]") || lineObject.text.includes("[META]")) {
      // Non-greedy regex, matches each [BIBLE]...[/BIBLE] block separately
      const bibleRegex = /\[(BIBLE|META)\](.*?)(?:\[X\](.*?)(?:\[X\](.*?))?)?\[\1\]/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = bibleRegex.exec(lineObject.text)) !== null) {
        const tagType = match[1];
        const startIndex = match.index;

        if (tagType === "BIBLE") {
          const bibleCode = match[2];
          const text = match[3];
          const translation = match[4];

          // console.log(`Bible match found: ${bibleCode}, text: ${text}, translation: ${translation}, startIndex: ${startIndex}`);

          // Add text before
          if (startIndex > lastIndex) {
            const beforeLink = lineObject.text.substring(lastIndex, startIndex);
            if (beforeLink && beforeLink.length) {
              parts.push({ text: beforeLink });
            }
          }

          // Add the bible text
          const bibleObj = { text, bibleCode: bibleCode };
          if (translation) {
            bibleObj.translation = translation;
          }
          if (typeof bibleCode === 'string') {
            const isContinue =  bibleCode.includes('CONTINUE');
            if (isContinue) {
              bibleObj.bibleCode = lastBibleCode;
              bibleObj.bibleType = lastBibleType;
              bibleObj.isContinue = true;
            } else {
              if (bibleCode.includes('.EXACT')) {
                bibleObj.bibleCode = bibleCode.replace(/\.EXACT/, '');
                bibleObj.bibleType = 1;
              } else if (bibleCode.includes('.NOT_EXACT')) {
                bibleObj.bibleCode = bibleCode.replace(/\.NOT_EXACT/, '');
                bibleObj.bibleType = 2;
              } else if (bibleCode.includes('.PARAPHRASE')) {
                bibleObj.bibleCode = bibleCode.replace(/\.PARAPHRASE/, '');
                bibleObj.bibleType = 3;
              } else if (bibleCode.includes('.ALLUSION')) {
                bibleObj.bibleCode = bibleCode.replace(/\.ALLUSION/, '');
                bibleObj.bibleType = 4;
              }
              lastBibleCode = bibleObj.bibleCode;
              lastBibleType = bibleObj.bibleType;
            }
          }
          parts.push(bibleObj);
        } else if (tagType === "META") {
          // Parse metaInfo for theme and bible
          const metaInfo = match[2];
          const metaText = match[3];
          let themeId = undefined;
          let bibleCitation = undefined;
          if (metaInfo) {
            // Split metaInfo by semicolon, handle multiple meta tags
            const metaTags = metaInfo.split(';').map(s => s.trim());
            metaTags.forEach(tag => {
              if (tag.startsWith('THEME.')) {
                themeId = tag.substring('THEME.'.length);
              } else if (tag.startsWith('BIBLE.')) {
                bibleCitation = tag.substring('BIBLE.'.length);
              }
            });
          }
          const metaObj = { text: metaText };
          if (themeId) metaObj.themeId = themeId;
          if (bibleCitation) metaObj.bibleCitation = bibleCitation;
          // Add text before the meta block
          if (startIndex > lastIndex) {
            const beforeMeta = lineObject.text.substring(lastIndex, startIndex);
            if (beforeMeta && beforeMeta.length) {
              parts.push({ text: beforeMeta });
            }
          }
          parts.push(metaObj);
        }
        // Update the last index
        lastIndex = startIndex + match[0].length;
      }

      // Add text after
      const afterLink = lineObject.text.substring(lastIndex);
      if (afterLink && afterLink.length) {
        parts.push({ text: afterLink });
      }

      // Update lineObject.text with the processed parts
      lineObject.text = parts;
    }

   
    if (lineObject.text.includes(LETTER_NOTE_FORMAT)) {
      const splitByLetterNote = lineObject.text.split(LETTER_NOTE_FORMAT);
      lineObject.noteNumber = "0";
      const s2 = splitByLetterNote[1].trim();
      const splitByLetterNumber = s2.split(LETTER_NUMBER_FORMAT);
      lineObject.letterNumber = +(splitByLetterNumber[1].trim());
      lineObject.text = splitByLetterNumber[2].trim();
      lineObject.isNoteBeginning = true;
    }

    if (lineObject.text.includes(HEADER2_FORMAT)) {
      lineObject.text = lineObject.text.replace(HEADER2_FORMAT, "").trim();
      lineObject.format = "header2";
    }
    else if (lineObject.text.includes(HEADER3_FORMAT)) {
      lineObject.text = lineObject.text.replace(HEADER3_FORMAT, "").trim();
      lineObject.format = "header3";
    }
    else if (lineObject.text.includes(HEADER4_FORMAT)) {
      lineObject.text = lineObject.text.replace(HEADER4_FORMAT, "").trim();
      lineObject.format = "header4";
    }

    if (lineObject.text.includes(SKOVORODA_NOTE_NUMBER_FORMAT)) {
      const splitByNoteNumber = lineObject.text.split(SKOVORODA_NOTE_NUMBER_FORMAT);
      lineObject.noteNumber = splitByNoteNumber[1].trim();
      const s2 = splitByNoteNumber[2].trim();
      if (s2.includes(LETTER_NUMBER_FORMAT)) {
        const splitByLetterNumber = s2.split(LETTER_NUMBER_FORMAT);
        lineObject.letterNumber = +(splitByLetterNumber[1].trim());
        lineObject.text = splitByLetterNumber[2].trim();
        lineObject.isNoteBeginning = true;
      } else if (s2.includes(SONG_NUMBER_FORMAT)) {
        const splitBySongNumber = s2.split(SONG_NUMBER_FORMAT);
        lineObject.songNumber = +(splitBySongNumber[1].trim());
        lineObject.text = splitBySongNumber[2].trim();
        lineObject.isNoteBeginning = true;
      } else if (s2.includes(FABLE_NUMBER_FORMAT)) {
        const splitByFableNumber = s2.split(FABLE_NUMBER_FORMAT);
        lineObject.fableNumber = +(splitByFableNumber[1].trim());
        lineObject.text = splitByFableNumber[2].trim();
        lineObject.isNoteBeginning = true;
      }
    }

    if (!isEmptyLine && lineObject.text.includes(MAIN_SECTION_FORMAT)) {
      isMainSection = !isMainSection;
      isMainSectionMode = true;
      return;
    }

    if (!isEmptyLine) {

      // Source notes like [29 — C. 101] or [3]
      const outSourcesNotesRegex = getOurSourcesNotesRegex();
      const sourcesNotesMetadata = [];
      while(true) {
        const regexResults = outSourcesNotesRegex.exec(lineObject.text);
        if (!regexResults) {
          break;
        }
        regexResults.forEach(regexResult => {
          const index = outSourcesNotesRegex.lastIndex;
          const sourceId = parseSourceIdFromRegex(regexResult);
          if (!sourceId) {
            return;
          }
          const noteMetadata = { 
            sourceId: sourceId, 
            index: index - regexResult.length, 
            length: regexResult.length 
          };
          sourcesNotesMetadata.push(noteMetadata);
        });
      }
      if (sourcesNotesMetadata.length) {
        transformLineObjectWithOurSourceNotes(lineObject, sourcesNotesMetadata);
      } 

      const notesRegex = getNotesRegex();
      const notesMetadata = [];
      const lineObjectArray = Array.isArray(lineObject.text) ? lineObject.text : [lineObject];
      lineObjectArray.forEach(subLineObject => {
        while(true) {
          const regexResults = notesRegex.exec(subLineObject.text);
          if (!regexResults) {
            break;
          } 
          regexResults.forEach(regexResult => {
            const index = notesRegex.lastIndex;
            const notesNumber = parseNotesNumber(regexResult);
            const noteMetadata = { notesNumber: notesNumber, index: index - regexResult.length, length: regexResult.length };
            notesMetadata.push(noteMetadata);
          });
        }
        if (notesMetadata.length) {
          transformLineObjectWithNotes(subLineObject, notesMetadata);
        } 
      });
      if (Array.isArray(lineObject.text)) {
        lineObject.text = lineObject.text.flatMap(sub => Array.isArray(sub.text) ? sub.text : [sub]);
      }
      
      // --
      if (isOldUaText && lineObject.text && lineObject.text.length) {
        if (typeof lineObject.text === 'string') {
          const explanationsData = textToExplanations(lineObject.text);
          if (explanationsData.length) {
            transformLineObjectWithOldUaExplanations(lineObject, explanationsData);
          }
        } else if (Array.isArray(lineObject.text)) {
          lineObject.text = lineObject.text.map(subLineObject => {
            if (!subLineObject.text || !subLineObject.text.length || subLineObject.bibleCode) {
              return [subLineObject];
            }
            const explanationsData = textToExplanations(subLineObject.text);
            if (!explanationsData.length) {
              return [subLineObject];
            }
            transformLineObjectWithOldUaExplanations(subLineObject, explanationsData);
            return subLineObject.text;
          }).flat();
        }
      }
      // --
    }

    if (!isEmptyLine) {
      transformLineObjectWithIrmologionEtc(lineObject);
    }

    if (parsedContent.length || parsedMainSection.length || parsedAfterMainSection.length || !isEmptyLine) {
      if (!isMainSectionMode) {
        parsedContent.push(lineObject);
      } else if (isMainSection) {
        parsedMainSection.push(lineObject);
      } else if (!isMainSection) {
        parsedAfterMainSection.push(lineObject);
      }
    }
  });

  if (!isMainSectionMode) {
    removeEmptyLinesAtTheEnd(parsedContent);
  } else {
    removeEmptyLinesAtTheEnd(parsedAfterMainSection);
  }
  
  if (isMainSectionMode) {
    return {
      beforeMain: parsedContent,
      main: parsedMainSection,
      afterMain: parsedAfterMainSection,
    };
  }

  if (parsedContent.length) {
    parsedContent[0].isAllIsList = isAllIsList;
  }

  return parsedContent;
  // OLD CODE }
}