// Required packages:
// npm install mammoth html-to-text fs

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const { convert } = require('html-to-text');

const superscriptMap = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³',
    '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷',
    '8': '⁸', '9': '⁹'
};

function addMarkers(html, isNotes = false) {
    let processed = html;

    if (isNotes) {
        // Move NoteNumber before Italic when superscript inside italics
        processed = processed.replace(/<i><sup>(\d+)<\/sup>(.*?)<\/i>/g, (_, number, content) => {
            return `[NoteNumber]${number}[NoteNumber][Italic]${content}[Italic]`;
        });
        processed = processed.replace(/<em><sup>(\d+)<\/sup>(.*?)<\/em>/g, (_, number, content) => {
            return `[NoteNumber]${number}[NoteNumber][Italic]${content}[Italic]`;
        });
        // Regular handling
        processed = processed.replace(/<strong>(.*?)<\/strong>/g, '[Bold]$1[Bold]')
            .replace(/<b>(.*?)<\/b>/g, '[Bold]$1[Bold]')
            .replace(/<em>(.*?)<\/em>/g, '[Italic]$1[Italic]')
            .replace(/<i>(.*?)<\/i>/g, '[Italic]$1[Italic]')
            .replace(/<sup>(\d+)<\/sup>/g, (_, number) => {
                return `[NoteNumber]${number}[NoteNumber]`;
            });
    } else {
        processed = processed.replace(/<strong>(.*?)<\/strong>/g, '[Bold]$1[Bold]')
            .replace(/<b>(.*?)<\/b>/g, '[Bold]$1[Bold]')
            .replace(/<em>(.*?)<\/em>/g, '[Italic]$1[Italic]')
            .replace(/<i>(.*?)<\/i>/g, '[Italic]$1[Italic]')
            .replace(/<sup>(.*?)<\/sup>/g, (_, content) =>
                content.split('').map(ch => superscriptMap[ch] || ch).join('')
            );
    }

    return processed;
}

async function convertDocxToTxt(inputPath, outputBasePath) {
    try {
        const { value: html } = await mammoth.convertToHtml({ path: inputPath });

        const [mainPartHtml, notesPartHtml] = html.split(/ПРИМІТКИ/i);

        const mainMarked = addMarkers(mainPartHtml);
        const notesMarked = notesPartHtml ? addMarkers(notesPartHtml, true) : '';

        const mainText = convert(mainMarked, {
            wordwrap: false,
            selectors: [
                { selector: 'a', options: { ignoreHref: true } },
                { selector: 'img', format: 'skip' }
            ]
        });

        const notesText = convert(notesMarked, {
            wordwrap: false,
            selectors: [
                { selector: 'a', options: { ignoreHref: true } },
                { selector: 'img', format: 'skip' }
            ]
        });

        if (fs.existsSync(`${outputBasePath}.txt`)) fs.unlinkSync(`${outputBasePath}.txt`);
        fs.writeFileSync(`${outputBasePath}.txt`, mainText);
        console.log(`✅ Saved: ${outputBasePath}.txt`);

        if (notesText.trim()) {
            if (fs.existsSync(`${outputBasePath} NOTES.txt`)) fs.unlinkSync(`${outputBasePath} NOTES.txt`);
            fs.writeFileSync(`${outputBasePath} NOTES.txt`, notesText);
            console.log(`✅ Saved: ${outputBasePath} NOTES.txt`);
        }
    } catch (err) {
        console.error('❌ Error processing', inputPath, err);
    }
}

async function processAllFiles() {
    const inputDir = path.join(__dirname, 'input');
    const outputDir = path.join(__dirname, 'output');

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.docx'));

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const baseName = file.replace(/\.docx$/, '');
        const outputBasePath = path.join(outputDir, baseName);
        await convertDocxToTxt(inputPath, outputBasePath);
    }
}

processAllFiles();
