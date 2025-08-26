import { xmlHelper_parseMetaTagsWithTextAndNesting } from "./xmlHelper";

describe('xmlHelper_parseMetaTagsWithTextAndNesting', () => {
  
  it('parses simple text with no meta', () => {
    const input = 'just plain text';
    const output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { text: 'just plain text', start: 0 }
    ]);
  });

  it('parses single meta tag', () => {
    const input = 'a <meta f="i">b</meta> c';
    const output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { text: 'a ', start: 0 },
  { text: 'b', start: 2, meta: { f: 'i' } },
      { text: ' c', start: 3 }
    ]);
  });

  it('parses nested meta tags', () => {
    const input = 'x <meta a="1">y <meta b="2">z</meta> w</meta> q';
    const output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { text: 'x ', start: 0 },
      {
        text: 'y z w',
        start: 2,
  meta: { a: '1' },
        innerParsedTextArray: [
          { text: 'y ', start: 2 },
          { text: 'z', start: 4, meta: { b: '2' } },
          { text: ' w', start: 5 }
        ]
      },
      { text: ' q', start: 7 }
    ]);
  });

  it('parses complex input', () => {
    const input = 'text <meta link="https://example.com/">long <meta f="i" f="b">text</meta> here</meta> another text continueing here <meta bible="ISA.1.2">txt her</meta> eetc <meta f="i">something else</meta>';
    const output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { text: 'text ', start: 0 },
      {
        text: 'long text here',
        start: 5,
  meta: { link: 'https://example.com/' },
        innerParsedTextArray: [
          { text: 'long ', start: 5 },
          { text: 'text', start: 10, meta: { f: ['i', 'b'] } },
          { text: ' here', start: 14 }
        ]
      },
      { text: ' another text continueing here ', start: 19 },
  { text: 'txt her', start: 50, meta: { bible: 'ISA.1.2' } },
      { text: ' eetc ', start: 57 },
  { text: 'something else', start: 63, meta: { f: 'i' } }
    ]);
  });

  it('parses legacy bible tags', () => {
    let input = '[BIBLE]REV.12.15.ALLUSION[X]если не оная Змїи́на, Сирéнская Блевóтина[BIBLE]';
    let output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { 
        text: 'если не оная Змїи́на, Сирéнская Блевóтина', 
        start: 0,
  meta: { bible: 'REV.12.15.ALLUSION' }
      },
    ]);
    input = 'Text Before [BIBLE]REV.12.15.ALLUSION[X]если не оная Змїи́на, Сирéнская Блевóтина[BIBLE] Text After';
    output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      {
        text: 'Text Before ',
        start: 0,
      },
      { 
        text: 'если не оная Змїи́на, Сирéнская Блевóтина', 
        start: 12,
        meta: { bible: 'REV.12.15.ALLUSION' }
      },
      {
        text: ' Text After',
        start: 53
      }
    ]);
  });

  it('parses legacy bible tags with translation', () => {
    const input = '[BIBLE]JDG.6.23.NOT_EXACT[X]Мир тебѣ! Не бойся[X]Мир тобі, не бійся, не помреш![BIBLE]';
    const output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { 
        text: 'Мир тебѣ! Не бойся', 
        start: 0,
        meta: {
          bible: 'JDG.6.23.NOT_EXACT',
          translation: "Мир тобі, не бійся, не помреш!"
        }
      },
    ]);
  });
  
  it('parses legacy line formattings', () => {
    const input = 'Some Text [Center]';
    const output = xmlHelper_parseMetaTagsWithTextAndNesting(input);
    expect(output).toEqual([
      { 
        text: 'Some Text', 
        start: 0,
        meta: {
          f: 'center'
        }
      },
    ]);
  });

});
