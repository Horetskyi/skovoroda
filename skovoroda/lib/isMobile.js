import UAParser from "ua-parser-js";

export default function isMobile(userAgent) {
    if (!userAgent || !userAgent.length) {
        return false;
    }

    // https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers
    const userAgentLower = userAgent.toLocaleLowerCase();
    if ((userAgentLower.includes('bot') || userAgentLower.includes('inspectiontool')) && userAgentLower.includes('google')) {
        return userAgentLower.includes('mobile'); 
    }

    if (userAgentLower.includes('mobile')) {
        return true;
    }

    const parserResult = UAParser(userAgent);
    return parserResult?.device?.type === "mobile";

}