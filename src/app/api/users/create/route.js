// src/app/api/users/create/route.js
import dbConnect from '../../../lib/db';       
import User from '../../../models/User';  

export async function POST(request) {
  console.log('Connecting to MongoDB...');
  try {
    await dbConnect();
    console.log('Connected to MongoDB ✅');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return new Response(JSON.stringify({ message: 'Failed to connect to database' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate required fields
    if (!body.name || !body.email || !body.password) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      console.log('User already exists:', existingUser);
      return new Response(JSON.stringify({ message: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create and save user
    const user = new User(body);
    await user.save();
    console.log('User created:', user);

    return new Response(JSON.stringify({ message: 'User created', user }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}