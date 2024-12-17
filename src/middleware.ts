import { NextResponse, NextRequest } from 'next/server';
import { handleFirebaseResponse } from './services/firebase/auth';
import { fetchRoleByFirebaseId } from './services/firebase/fetchUserById';




export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Check if this is an API route
  if (url.pathname.startsWith('/api')) {
    const apiKey = req.headers.get('api-key');
    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return new NextResponse(JSON.stringify({ error: 'Invalid API key' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return NextResponse.next();
  }

  if (url.pathname.startsWith('/dashboard')) {

    const cookieHeader = req.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader
      .split(';')
      .map(cookie => cookie.trim().split('=').map(decodeURIComponent))
  );

    const token = cookies.authToken;
    const uid = cookies.userUID;
    const role = cookies.userRole;


    if (!token || !uid || !role) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Validate the token using Firebase REST API
      const user = await handleFirebaseResponse(token);  // Validate the token and get user details

      // Ensure that the UID from the request matches the UID from the Firebase response
      if (user.localId !== uid) {
        console.error('UID mismatch:', { firebaseUid: user.uid, providedUid: uid });
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Fetch the actual role from the database (or logic to determine the role)
      const actualRole = await fetchRoleByFirebaseId(uid);

      // Check if provided role matches the actual role
      if (actualRole !== role) {
        console.error('Role mismatch:', { actualRole, providedRole: role });
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Continue with the request if everything is valid
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
  ], // Apply to both API and dashboard routes
};

