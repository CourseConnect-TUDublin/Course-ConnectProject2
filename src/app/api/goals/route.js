// /app/api/goals/route.js
import { NextResponse } from "next/server";
import { goals } from "../../../lib/goalsStore";

export async function GET() {
  // Return all goals
  return NextResponse.json({ success: true, data: goals });
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Create a new goal with a unique ID
    const newGoal = { ...body, id: Date.now() };
    goals.push(newGoal);
    return NextResponse.json({ success: true, data: newGoal });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
