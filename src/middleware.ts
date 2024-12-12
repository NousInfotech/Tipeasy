import { NextResponse } from 'next/server';

export async function middleware(req: Request) {
  const apiKey = req.headers.get('api-key');
  console.log('Received API Key:', apiKey); // Log the received API key

  // Check if the API key is provided and matches the environment variable
  if (apiKey !== process.env.API_KEY) {
    console.log('Invalid API key'); // Log if the key is invalid
    return new NextResponse(JSON.stringify({ error: 'Invalid API key' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log('API key is valid'); // Log if the key is valid
  return NextResponse.next(); // Continue the request
}

export const config = {
  matcher: '/api/:path*', // Apply middleware to API routes
};
