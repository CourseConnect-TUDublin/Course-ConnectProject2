import dbConnect from '../../../lib/db';
import User from '../../../models/User';

export async function PUT(request) {
  await dbConnect();

  try {
    const { email, name } = await request.json();

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name } },
      { new: true }
    );

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'User updated', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}