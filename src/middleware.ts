import { NextResponse, NextRequest } from 'next/server';
import { handleFirebaseResponse } from './services/firebase/auth';
import { fetchRoleByFirebaseId } from './services/firebase/fetchUserById';

const allowedOrigins = ['https://checkout.razorpay.com'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Middleware function to handle both CORS and authentication logic
export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // CORS Handling
  const origin = req.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);
  const isPreflight = req.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests and add CORS headers if the origin is allowed
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // API Key validation for /api routes
  if (url.pathname.startsWith('/api')) {
    const apiKey = req.headers.get('api-key');
    if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return new NextResponse(JSON.stringify({ error: 'Invalid API key' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return response; // Proceed to the next middleware if API key is valid
  }

  // Dashboard Authentication for /dashboard routes
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
      const user = await handleFirebaseResponse(token);

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
      return response;
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Proceed with the next middleware if no special conditions match
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',      // Apply to all /api routes
    '/dashboard/:path*', // Apply to all /dashboard routes
  ],
};
