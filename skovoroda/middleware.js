import { NextResponse } from 'next/server'
import isMobile from './lib/isMobile'
import { SkovorodaConstants } from './lib/skovorodaConstants';

export function middleware(request) {
  
  const pathName = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const path = pathName + search;

  if (
    pathName.includes(".fb2") || 
    pathName.includes(".epub") || 
    pathName.includes(".pdf") || 
    pathName.includes(".doc") ||
    pathName.includes(".docx") ||
    pathName.includes(".djvu")
  )
  {
    const documentFileUrl = new URL(path, "https://skovoroda.s3.eu-west-3.amazonaws.com/");
    const response = NextResponse.rewrite(documentFileUrl);
    if (pathName.includes('.fb2')) {
      response.headers.set('Content-Type', 'application/fb2+xml');
    }
    if (pathName.includes('.epub')) {
      response.headers.set('Content-Type', 'application/epub+zip');
    }
    return response;
  }

  const isPageRequest =
    !pathName.includes('_next/static') &&
    !pathName.includes('api') &&
    !pathName.includes('_next/image') &&
    !pathName.includes('.woff2') &&
    !pathName.includes('.ttf') &&
    !pathName.includes('.webp') &&
    !pathName.includes('.png') &&
    !pathName.includes('.xml') &&
    !pathName.includes('.jpg') &&
    !pathName.includes('.svg') &&
    !pathName.includes('iframes') &&
    !pathName.includes('.jpeg') &&
    !pathName.includes('.mp4') &&
    !pathName.includes('.css') &&
    !pathName.includes('.scss') &&
    !pathName.includes('.ico');

  // console.log(`isPageRequest: ${isPageRequest} for ${path}`)

  if (isPageRequest) {
    
    const userAgent = request.headers.get('user-agent');
    const isMobileValue = isMobile(userAgent);
    const deviceEnding = (isMobileValue ? SkovorodaConstants.mobileEnding : SkovorodaConstants.desktopEnding);
    const newPath = path.includes(SkovorodaConstants.mobileEnding) || path.includes(SkovorodaConstants.desktopEnding) 
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