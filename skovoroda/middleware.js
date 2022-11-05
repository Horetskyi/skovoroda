import { NextResponse } from 'next/server'
import isMobile from './lib/isMobile'

export function middleware(request) {
  
    const userAgent = request.headers.get('user-agent');
    const isMobileValue = isMobile(userAgent);
    const path = request.nextUrl.pathname + request.nextUrl.search;
    const newPath = path + "-" + (isMobileValue ? "mobile" : "desktop");
    return NextResponse.rewrite(new URL(newPath, request.url));
}

export const config = {
  matcher: '/test1/:path*',
}