import { NextResponse } from 'next/server'
import isMobile from './lib/isMobile'
import { SkovorodaConstants } from './lib/skovorodaConstants';

export function middleware(request) {
  
  const pathName = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const path = pathName + search;

  if (
    pathName.includes(".pdf") || 
    pathName.includes(".doc") ||
    pathName.includes(".docx") ||
    pathName.includes(".djvu")
  )
  {
    const pdfFileUrl = new URL(path, "https://skovoroda.s3.eu-west-3.amazonaws.com/");
    return NextResponse.rewrite(pdfFileUrl);
  }

  const isPageRequest =
    !pathName.includes('_next/static') &&
    !pathName.includes('api') &&
    !pathName.includes('.woff2') &&
    !pathName.includes('.webp') &&
    !pathName.includes('.png') &&
    !pathName.includes('.jpg') &&
    !pathName.includes('.ico');

  if (isPageRequest) {
    const userAgent = request.headers.get('user-agent');
    const isMobileValue = isMobile(userAgent);
    const deviceEnding = (isMobileValue ? SkovorodaConstants.mobileEnding : SkovorodaConstants.desktopEnding);
    const newPath = path.includes(deviceEnding) 
      ? path
      : pathName + deviceEnding + (search ? search + deviceEnding : "");
    console.log("REWRITE: ", path, newPath);
    return NextResponse.rewrite(new URL(newPath, request.url));
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: '/(.*)',
}