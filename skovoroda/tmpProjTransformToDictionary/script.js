// Script to convert all .txt files in input/ to a single dictionary array in output/dictionary.txt
// Format: [ [word(s)], meaning ], ...

const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');
const outputFile = path.join(outputDir, 'dictionary.txt');

function parseLine(line) {
    // Split by em dash or double dash
    const match = line.match(/^(.*?)\s*[—-]+\s*(.+)$/);
    if (!match) return null;
    let words = match[1].trim();
    let meaning = match[2].trim();

    // Split words by comma or parenthesis, handle variants
    let variants = words
        .split(/,|\(|\)/)
        .map(w => w.trim())
        .filter(Boolean);
    if (variants.length === 1) variants = variants[0];
    return [variants, meaning];
}

function parseFileContent(content) {
    const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const entries = [];
    for (const line of lines) {
        const entry = parseLine(line);
        if (entry) entries.push(entry);
    }
    return entries;
}

function main() {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.txt'));
    let allEntries = [];
    for (const file of files) {
        const content = fs.readFileSync(path.join(inputDir, file), 'utf8');
        allEntries = allEntries.concat(parseFileContent(content));
    }
    // Write as a pretty JS array
    const output = '[\n' + allEntries.map(([w, m]) => {
        const wordStr = Array.isArray(w) ? JSON.stringify(w) : JSON.stringify(w);
        return `  [ ${wordStr}, ${JSON.stringify(m)} ]`;
    }).join(',\n') + '\n]\n';
    fs.writeFileSync(outputFile, output, 'utf8');
    console.log(`✅ Dictionary written to ${outputFile}`);
}

main();
