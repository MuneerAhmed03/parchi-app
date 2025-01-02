import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const roomId = req.cookies.get('roomId');

  if (!roomId) {
    return NextResponse.redirect(new URL('/', req.url)); 
  }
  return NextResponse.next(); 
}

export const config = {
  matcher: ['/lobby','/game'], 
};
