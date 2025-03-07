// useTasks.js
import { useState, useCallback } from "react";
import { toast } from "react-toastify";

export function useTasks(userId) {
  const [tasks, setTasks] = useState({ red: [], amber: [], green: [] });

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks?ts=" + new Date().getTime(), { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        const grouped = { red: [], amber: [], green: [] };
        data.data.forEach((task) => {
          if (grouped[task.status]) grouped[task.status].push(task);
        });
        setTasks(grouped);
      } else {
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks.");
    }
  }, []);

  const addTask = async (task) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const responseData = await res.json();
      if (responseData.success) {
        toast.success("Task added successfully!");
        await fetchTasks();
      } else {
        toast.error("Failed to add task: " + responseData.error);
      }
    } catch (error) {
      toast.error("Error adding task.");
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Task updated successfully!");
        await fetchTasks();
      }
    } catch (error) {
      toast.error("Error updating task.");
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Task deleted successfully!");
        await fetchTasks();
      }
    } catch (error) {
      toast.error("Error deleting task.");
      console.error("Error deleting task:", error);
    }
  };

  const archiveTask = async (id) => {
    const taskToArchive = Object.values(tasks).flat().find((t) => t._id === id);
    if (!taskToArchive) return;
    const archivedTask = { ...taskToArchive, archived: true };
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(archivedTask),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Task archived successfully!");
        await fetchTasks();
      }
    } catch (error) {
      toast.error("Error archiving task.");
      console.error("Error archiving task:", error);
    }
  };

  return { tasks, fetchTasks, addTask, updateTask, deleteTask, archiveTask, setTasks };
}
