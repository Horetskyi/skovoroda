
/**
  
WHAT SCRIPT DOES?:
 
<understanding_input_files>
Checks all files from "inputs" directory.
Understands that "sviati_ottsi_v_skovorody.txt" relates to "sviati_ottsi_v_skovorody NOTES.txt"
NOTES files has lines like this example:
```
[NoteNumber]3[NoteNumber] [Italic]Лебедев А.[Italic] С. Г. С. Сковорода как богослов // Boпpocы философии и психологии. – 1895. - Кн. 27(2). - С. 170-177.
```
[Italic] should be ignored
[NoteNumber]3[NoteNumber] also should be ignored
</understanding_input_files>

<maintaining_global_sources>
Maintains "outputs/globalSources.json" which contains all books/articles which are referenced in the input files.
Script will not remove anything from globalSources.json by no reason
Script can merge duplicates in globalSources.json by title similarity + author similarity + same year
Script can add new sources to globalSources.json found in NOTES files
globalSources.json example:
```
[
  {
    "id": "ern__hryhoryi_savych_skovoroda_zhyzn_y_uchenye",
    "title": "Григорий Савич Сковорода. Жизнь и учение.",
    "year": 1912,
    "location": "Москва",
    "authorId": "ern_v_f"
  }
]
```
</maintaining_global_sources>

<maintaining_global_authors>
Maintains "outputs/globalAuthors.json" which contains all authors which are referenced in the input files.
Script will not remove anything from globalAuthors.json by no reason
Script can merge duplicates in globalAuthors.json by full name similarity
Script can add new authors to globalAuthors.json found in NOTES files
globalAuthors.json example:
```
[
  {
    "id": "ern_v_f",
    "author": "Зрн В. Ф."
  }
]
```
</maintaining_global_authors>

<analyzing_input_articles_and_generating_outputs>
Script will output analyzed files e.g. "outputs/analyzed__sviati_ottsi_v_skovorody.json"
Analyzed files will contain all unique sources ids which are referenced in the input file as array field 'sources'
Analyzed files will contain all unique source authors ids which are referenced in the input file as array field 'sources_authors'
Analyzed files will contain 'id' with input file name without extension e.g. 'sviati_ottsi_v_skovorody'
Analyzed fields also: notes_count, sentences_count, words_count, characters_count

Analysis also includes finding skovoroda texts mentioned in the text e.g. if text is:
```
Сковорода покликався на Златоуста також у візії «Брань архистратига Михаила со Сатаною». У спеціальній примітці 
```
algorithm will find the match between string "Брань архистратига Михаила со Сатаною" and existed data about all skovoroda texts
and will find that it mathes with text with id "borotba_arhystratiha_mihaila_s_satanoyu"
Also one of the output files will be "outputs/analyzed__sviati_ottsi_v_skovorody.txt" which will contain originalContent with modifications, e.g.
this line:
```
Сковорода покликався на Златоуста також у візії «Брань архистратига Михаила со Сатаною». У спеціальній примітці 
```
will be transformed into:
```
Сковорода покликався на Златоуста також у візії «[META]LINK.treatise.borotba_arhystratiha_mihaila_s_satanoyu[X]Брань архистратига Михаила со Сатаною[META]». У спеціальній примітці
```

analyzed__sviati_ottsi_v_skovorody.json example:
```
{
  "id": "sviati_ottsi_v_skovorody",
  "sources": [
    {
      "id": "ern__hryhoryi_savych_skovoroda_zhyzn_y_uchenye",
      "count": 2 // means referenced twice
    }
  ],
  "sources_authors": [
    {
      "id": "ern_v_f",
      "count": 3 // means referenced three times
    }
  ],
  "notes_count": 40,
  "sentences_count": 500,
  "words_count": 3400,
  "characters_count": 40000,
  "mentioned_skovoroda_texts": [
    {
      "id": "borotba_arhystratiha_mihaila_s_satanoyu",
      "count": 1 // means mentioned once  
    }
  ]
}
```
</analyzing_input_articles_and_generating_outputs>

*/
// ------------------------------------------------

const fs = require('fs');
const path = require('path');
const skovorodaTextsData = [
  {
    "id": "borotba_arhystratiha_mihaila_s_satanoyu",
    "possibleTitles": [
      "Брань Михаила с Сатаною",
      "Брань Михаила со Сатаною",
      "Брань архистратига Михаила со Сатаною",
      "Брань архистратига Михаила с Сатаною",
      "Боротьба Архистратига Михаїла зі Сатаною",
      "Боротьба Архистратига Михаїла зі Сатаною про те",
      "Боротьба Архистратига Михаїла зі Сатаною про те легко бути добрим",
      "Боротьба Архистратига Михаїла зі Сатаною про те: легко бути добрим",
      "Брань Архистратига Михаила со Сатаною о сем - Легко быть Благим",
      "Брань Архистратига Михаила со Сатаною о сем",
    ],
    "type": "treatise"
  },
  {
    "id": "zhinka_lotova",
    "possibleTitles": [
      "Жінка Лотова",
      "Жена Лотова",
      "Книжечка о Чтеніи Священнаго Писанія",
      "Книжечка о Чтеніи Священнаго Писанія, нареченна Жена Лотова",
      "Книжечка про читання Святого Письма",
      "Книжечка про читання Святого Письма, названа Жінка Лотова",
    ],
    "type": "treatise"
  }
];

// TODO: Implement all script specifications/requirements written above