import { metaTextProcessor } from "./metaTextProcessor";


describe('metaTextProcessor', () => {
  
  it('parses dictionary words', () => {
    const input = 'Слова Якоже';
    const output = metaTextProcessor(input, true);
    //console.log("Output:", JSON.stringify(output, null, 2));
    expect(output).toEqual({
      meta: {},
      lines: [
        [
          { 
            text: "Слова Якоже",
            start: 0,
            innerParsedTextArray: [
              { text: 'Слова ', start: 0 },
              { text: 'Якоже', start: 6, meta: {
                explanations: {
                  explanation: "оскільке, также, так само",
                  references: "zvslovnyk",
                }
              }},
            ]
          },
        ]
      ]
    });
  });

  it('parses simple sentence', () => {
    const input = 'Звичайне речення з декількох слів';
    const output = metaTextProcessor(input, true);
    // console.log("Output:", JSON.stringify(output, null, 2));
    expect(output).toEqual({
      meta: {},
      lines: [
        [
          { 
            text: "Звичайне речення з декількох слів",
            start: 0
          },
        ]
      ]
    });
  });

  it('parses simple sentence with bold', () => {
    const input = '[Bold]Горецький Дмитро[Bold] – засновник проекту';
    const output = metaTextProcessor(input, true);
    console.log("Output:", JSON.stringify(output, null, 2));
    expect(output).toEqual({
      meta: {},
      lines: [
        [
          { 
            text: "Горецький Дмитро",
            start: 0,
            meta: {
              f: "bold"
            }
          },
          { 
            text: " – засновник проекту",
            start: 16
          }
        ]
      ]
    });
  });

  it('parses simple several sentences with empty line', () => {
    const input = `Звичайне речення з [Italic]декількох[Italic] слів

    Кінець [Right]
    `;
    const output = metaTextProcessor(input, true);
    // console.log("Output:", JSON.stringify(output, null, 2));
    expect(output).toEqual({
      meta: {},
      lines: [
        [
          {
            "text": "Звичайне речення з ",
            "start": 0
          },
          {
            "text": "декількох",
            "start": 19,
            "meta": {
              "f": "italic"
            }
          },
          {
            "text": " слів",
            "start": 28
          }
        ],
        "EMPTY_LINE",
        [
          {
            "text": "Кінець",
            "start": 0,
            "meta": {
              "f": "right"
            }
          }
        ]
      ]
    });
  });

  it('parses notes', () => {
    const input = 'О! се златых вѣк⁶ лѣт!';
    const output = metaTextProcessor(input, true);
    // console.log("Notes Output:", JSON.stringify(output, null, 2));
    const hasNote = output.lines[0].some(piece => piece && piece.meta && piece.meta.noteNumber == "6" && piece.text === "⁶");
    expect(hasNote).toEqual(true);
  });

});
