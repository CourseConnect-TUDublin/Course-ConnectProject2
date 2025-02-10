// src/app/api/hello/route.js
import dbConnect from 'src/app/lib/dbConnect.js';

export async function GET(request) {
  try {
    // Connect to MongoDB using our connection utility
    await dbConnect();

    // Return a successful response with a JSON message
    return new Response(JSON.stringify({ message: 'Hello, World! Connected to MongoDB!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Return an error response if the connection fails
    return new Response(
      JSON.stringify({ error: 'Failed to connect to MongoDB', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
