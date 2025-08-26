# Meta Text Processor

Initial thoughts: I need text editor similar to Markdown, but with far more features, and XML is too messy for me.

## Features:

- Marking text with any Meta Information e.g.:
  - Marking Bible Citations <meta bible="REV.12.15.ALLUSION">если не оная Змїи́на, Сирéнская Блевóтина</meta>
  - Same Bible Verse on different lines might be handled e.g.: 
    ```
    <meta bible="REV.12.15.ALLUSION">если не оная Змїи́на,</meta>
    <meta bible="CONTINUE">Сирéнская Блевóтина</meta>
    ```

- Marking text for different Formatting, e.g.:
  - Italic and Bold: <meta f="i" f="b">оная Змїи́на</meta>

- Marking text for different Element Types, e.g.:
  - Italic and Bold: <meta el="h2">Джерела Сковороди</meta>

- Meta Information and Formatting might be combined, e.g.:
  - Italic inside Bible citation: <meta bible="REV.12.15.ALLUSION">если не <meta f="i">оная Змїи́на</meta>, Сирéнская Блевóтина</meta>

- Auto Mapping Words from Dictionary

- Understanding Notes and adding them to Meta Information

- Output is JSON, so it's easy to render later on inside Web Frameworks

## Examples:

const input = 'text <meta link="https://example.com/">long <meta f="i" f="b">text</meta> here</meta> another text continueing here <meta bible="ISA.1.2">txt her</meta> eetc <meta f="i">something else</meta>';

const output = [
  {
    "text":"text ",
    "start":0
  },
  {
    "text":"long text here",
    "start":39,
    "meta":[
      "link":"https://example.com/"
    ],
    "innerParsedTextArray": [
      {
        "text":"long ",
        "start":39
      },
      {
        "text":"text",
        "start":44,
        "meta": [
          "f": [
            "i", "b"
          ]
        ],
      },
      {
        "text":" here",
        "start":48
      }
    ]
  },
  {
    "text":" another text continueing here ",
    "start":85
  },
  {
    "text":"txt her",
    "start":116,
    "meta": [
      "bible": "ISA.1.2"
    ]
  },
  {
    "text":" eetc ",
    "start":152
  },
  {
    "text":"something else",
    "start":158,
    "meta": [
      "f": "i"
    ]
  }
]