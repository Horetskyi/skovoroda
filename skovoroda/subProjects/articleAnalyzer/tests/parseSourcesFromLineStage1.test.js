const { parseSourcesFromLineStage1 } = require("../logic/parseSourcesFromLine");

describe('parseSourcesFromLineStage1', () => {
  it('parses a typical NOTES line', () => {
    const input = '[NoteNumber]71[NoteNumber][Italic] Чижевський Д.[Italic] Філософія Г. С. Сковороди / Підготовка тексту й переднє слово проф. Леоніда Ушкалова. - Харків, 2004. - С. 46.';
    const expected = [
      {
        authorId: 'chyzhevskyi_d',
        authorName: "Чижевський Д.",
        titleId: "filosofiia_h_s_skovorody",
        title: 'Філософія Г. С. Сковороди',
        location: 'Харків',
        year: 2004
      }
    ];
    expect(parseSourcesFromLineStage1(input)).toEqual(expected);
  });
});
