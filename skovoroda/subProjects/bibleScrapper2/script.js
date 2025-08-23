const fs = require('fs').promises;
const path = require('path');
const https = require('https');


const cheerio = require('cheerio');

async function scrapeBible(configurations) {
    const url = `${configurations.baseUrl}${configurations.bookWebsiteCode}/${configurations.chapter}/`;
    try {
        await new Promise(resolve => setTimeout(resolve, configurations.delayMs || 100));

        // Check if file already exists and skip if configurations.skipExistingFiles is true
        const outputDir = path.join(__dirname, 'output');
        const filename = `${configurations.bookOutputCode}.${configurations.chapter}.txt`;
        const filepath = path.join(outputDir, filename);
        if (configurations.skipExistingFiles) {
            try {
                await fs.access(filepath);
                console.log(`File ${filename} already exists, skipping...`);
                return;
            } catch (error) {
                // File doesn't exist, continue with scraping
            }
        }

        if (configurations.currentScrape >= configurations.maxScrape) {
            console.log(`Reached maximum scrape limit of ${configurations.maxScrape}. Stopping`);
            return;
        }
        console.log(`Scraping ${configurations.bookOutputCode}.${configurations.chapter} from ${url}`);
        const html = await fetchHtml(url);
        configurations.currentScrape++;

        // Parse HTML and extract verses
        const $ = cheerio.load(html);
        const verseDivs = $('div.elz > div[id]');
        if (!verseDivs.length) {
            throw new Error('No verses found on page. Stopping.');
        }
        let resultString = '';
        verseDivs.each(function() {
            const id = $(this).attr('id');
            // Clone the verse div and remove <sup> elements (verse numbers)
            const verseClone = $(this).clone();
            verseClone.find('sup').remove();
            const text = verseClone.text().replace(/^\s+|\s+$/g, '');
            if (resultString.length > 0) {
                resultString += '\n';
            }
            resultString += `[Number] ${id} [Number] ${text}`;
        });

        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(filepath, resultString, 'utf8');
        console.log(`Successfully scraped and saved verses to ${filename}`);

        // Try to crawl next chapter
        const nextChapter = parseInt(configurations.chapter, 10) + 1;
        const nextUrl = `${configurations.baseUrl}${configurations.bookWebsiteCode}/${nextChapter}/`;
        try {
            // Try fetching next chapter to see if it exists
            await fetchHtml(nextUrl);
            // If fetch succeeds, recursively scrape next chapter
            const newConfiguration = { ...configurations, chapter: String(nextChapter) };
            await scrapeBible(newConfiguration);
        } catch (err) {
            console.log('No more chapters or error fetching next chapter. Stopping.');
        }
    } catch (error) {
        console.error('Error scraping Bible:', error.message);
    }
}


// auxiliary
function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(data);
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}


async function scrapeManyBibles(books) {
    for (const bookArgs of books) {
        const configurations = {
            bookWebsiteCode: bookArgs[0],
            bookOutputCode: bookArgs[1],
            chapter: '1',
            baseUrl: `https://bible.by/elzs/`,
            skipExistingFiles: true,
            maxScrape: 300,
            currentScrape: 0,
            delayMs: 124,
        };
        await scrapeBible(configurations);
    }
}

// entry point
scrapeManyBibles([
    // ['40', 'MAT'], ✅
    ['23', 'ISA'],
]);