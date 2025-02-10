// src/app/api/users/route.js
import dbConnect from 'src/app/lib/dbConnect.js';
import User from 'src/models/User.js';

// Handle POST requests to create a new user
export async function POST(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Get the request data (assuming JSON)
    const body = await request.json();

    // Create a new user document
    const newUser = new User(body);
    await newUser.save();

    return new Response(
      JSON.stringify({ message: 'User created successfully', user: newUser }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to create user', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
