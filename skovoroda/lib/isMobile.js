import * as Parser from "ua-parser-js";

export default function isMobile(userAgent) {

    const parserResult = Parser(userAgent || '');
    return parserResult?.device?.type === "mobile";

}