import dbConnect from '../../../utils/dbConnect';
import Session from '../../../models/Session';

/**
 * POST /api/sessions
 * Creates a new study session.
 */
export async function POST(request) {
  await dbConnect();
  try {
    const payload = await request.json();
    console.log("Received payload for session creation:", payload);

    const { tutor, student, startTime, endTime } = payload;
    if (!tutor || !student || !startTime || !endTime) {
      throw new Error("Missing required fields: tutor, student, startTime, or endTime");
    }

    // Convert startTime and endTime to Date objects and validate them
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid date format provided for startTime or endTime");
    }

    const newSession = new Session({
      tutor,
      student,
      startTime: startDate,
      endTime: endDate,
      status: "pending",
    });

    await newSession.save();
    console.log("New session created successfully:", newSession);
    return new Response(JSON.stringify(newSession), { status: 201 });
  } catch (error) {
    console.error("Error creating session:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to create session" }), { status: 400 });
  }
}

/**
 * GET /api/sessions
 * Fetches all study sessions.
 */
export async function GET() {
  await dbConnect();
  try {
    const sessions = await Session.find({});
    return new Response(JSON.stringify(sessions), { status: 200 });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch sessions" }), { status: 400 });
  }
}
