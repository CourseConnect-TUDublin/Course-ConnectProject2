// /src/app/api/goals/[id]/route.js
import { NextResponse } from "next/server";
import { goals } from "../../../../mocks/lib/goalsStore";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const goalIndex = goals.findIndex((goal) => String(goal.id) === id);
    if (goalIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Goal not found" },
        { status: 404 }
      );
    }
    // Update the goal with new data
    goals[goalIndex] = { ...goals[goalIndex], ...body };
    return NextResponse.json({ success: true, data: goals[goalIndex] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
