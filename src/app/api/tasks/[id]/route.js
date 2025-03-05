import { connectToDatabase } from "src/lib/dbConnect.js";
import Task from "src/models/Task.js";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "src/app/api/auth/[...nextauth]/route.js";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error("GET /api/tasks: No session found");
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  console.log("GET /api/tasks: Session user id:", session.user.id);

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const archivedParam = searchParams.get("archived");
    // Cast session.user.id to an ObjectId to ensure proper matching
    let filter = { userId: new mongoose.Types.ObjectId(session.user.id) };
    filter.archived = archivedParam === "true";
    const tasks = await Task.find(filter);
    console.log("GET /api/tasks: Retrieved tasks", tasks);
    return new Response(
      JSON.stringify({ success: true, data: tasks }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch tasks" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error("POST /api/tasks: No session found");
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  console.log("POST /api/tasks: Session user id:", session.user.id);
  try {
    await connectToDatabase();
    const body = await req.json();
    console.log("POST /api/tasks: Received body", body);
    if (!body.dueDate) {
      return new Response(
        JSON.stringify({ success: false, error: "Due date is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const dueDate = new Date(body.dueDate);
    if (isNaN(dueDate.getTime())) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid due date" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    // Override any submitted userId with the current session's user ID
    const userId = new mongoose.Types.ObjectId(session.user.id);
    const newTask = new Task({
      title: body.title,
      description: body.description,
      status: body.status,
      dueDate: dueDate,
      userId: userId,
      order: body.order || 0,
      priority: body.priority || "Medium",
      category: body.category || "",
      subtasks: body.subtasks || [],
      archived: body.archived || false,
      recurring: body.recurring || false,
    });
    await newTask.save();
    console.log("POST /api/tasks: Task created", newTask);
    return new Response(
      JSON.stringify({ success: true, data: newTask }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding task:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to add task" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error("PUT /api/tasks: No session found");
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    await connectToDatabase();
    const body = await req.json();
    if (!body._id) {
      return new Response(
        JSON.stringify({ success: false, error: "Task ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (body.dueDate) {
      const dueDate = new Date(body.dueDate);
      if (isNaN(dueDate.getTime())) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid due date" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      body.dueDate = dueDate;
    }
    const updatedTask = await Task.findByIdAndUpdate(body._id, body, { new: true });
    console.log("PUT /api/tasks: Task updated", updatedTask);
    return new Response(
      JSON.stringify({ success: true, data: updatedTask }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to update task" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.error("DELETE /api/tasks: No session found");
    return new Response(
      JSON.stringify({ success: false, error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Task.findByIdAndDelete(id);
    console.log("DELETE /api/tasks: Task deleted, id:", id);
    return new Response(
      JSON.stringify({ success: true, message: "Task deleted" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete task" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
