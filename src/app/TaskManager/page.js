"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Archive as ArchiveIcon,
} from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

// Helper for reordering items in a list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// Modern TaskCard component using MUI Card with traffic light accent
function TaskCard({ task, index, onDelete, onEdit, onArchive }) {
  let borderColor, bgColor;
  switch (task.status) {
    case "red":
      borderColor = "#e53935";
      bgColor = "#ffebee";
      break;
    case "amber":
      borderColor = "#fb8c00";
      bgColor = "#fff3e0";
      break;
    case "green":
      borderColor = "#43a047";
      bgColor = "#e8f5e9";
      break;
    default:
      borderColor = "#cccccc";
      bgColor = "#ffffff";
  }
  return (
    <Draggable draggableId={String(task._id)} index={index}>
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          whileHover={{ scale: 1.02 }}
          style={{ marginBottom: "16px", ...provided.draggableProps.style }}
        >
          <Card
            sx={{
              borderLeft: `6px solid ${borderColor}`,
              backgroundColor: bgColor,
              boxShadow: 3,
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {task.title}
                </Typography>
                <Box>
                  <IconButton size="small" onClick={() => onEdit(task)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(task._id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  {task.status === "green" && (
                    <IconButton size="small" onClick={() => onArchive(task._id)}>
                      <ArchiveIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {task.description}
              </Typography>
              {task.dueDate && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Draggable>
  );
}

export default function TaskManager() {
  const { data: session } = useSession();
  const userId = session?.user?.id || session?.user?.sub;

  // Tasks stored as an object keyed by status.
  const [tasks, setTasks] = useState({ red: [], amber: [], green: [] });
  // New task form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "red",
    dueDate: "",
    order: 0,
  });
  // Inline editing modal state
  const [editingTask, setEditingTask] = useState(null);
  // Search term and sort order
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch tasks from backend API with cache busting
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks?ts=" + new Date().getTime(), { cache: "no-store" });
      const data = await res.json();
      if (data.success) {
        const grouped = { red: [], amber: [], green: [] };
        data.data.forEach((task) => {
          if (grouped[task.status]) {
            grouped[task.status].push(task);
          }
        });
        setTasks(grouped);
      } else {
        console.error("Failed to fetch tasks:", data.error);
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error fetching tasks.");
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    } else {
      console.log("User ID not available yet.");
    }
  }, [fetchTasks, userId]);

  // Filter and sort tasks based on search and sort order
  const filteredTasks = (() => {
    const filtered = {};
    Object.keys(tasks).forEach((status) => {
      filtered[status] = tasks[status]
        .filter(
          (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (a.order === undefined || b.order === undefined) return 0;
          return sortOrder === "asc" ? a.order - b.order : b.order - a.order;
        });
    });
    return filtered;
  })();

  // Add new task via backend API
  const handleAddTask = async () => {
    if (newTask.title.trim() === "") return;
    if (!newTask.dueDate) {
      alert("Due date is required!");
      return;
    }
    if (!userId) {
      alert("User information is still loading. Please try again.");
      return;
    }
    // Determine order: current length of the column
    const columnTasks = tasks[newTask.status] || [];
    const order = columnTasks.length;
    const taskToAdd = {
      ...newTask,
      dueDate: new Date(newTask.dueDate).toISOString(),
      userId,
      order,
    };
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskToAdd),
      });
      const responseData = await res.json();
      if (responseData.success) {
        toast.success("Task added successfully!");
        await fetchTasks();
        setNewTask({ title: "", description: "", status: "red", dueDate: "", order: 0 });
      } else {
        console.error("Failed to add task:", responseData.error);
        toast.error("Failed to add task: " + responseData.error);
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Error adding task.");
    }
  };

  // Delete task via backend API
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Task deleted successfully!");
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task.");
    }
  };

  // Archive task (update the task's archived field)
  const handleArchiveTask = async (id) => {
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
      console.error("Error archiving task:", error);
      toast.error("Error archiving task.");
    }
  };

  // Open edit modal
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Save updated task via backend API
  const handleSaveTask = async () => {
    if (!editingTask) return;
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTask),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Task updated successfully!");
        setEditingTask(null);
        await fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Error updating task.");
    }
  };

  // Update backend order for tasks in a specific column
  const updateColumnOrder = async (status, items) => {
    for (let i = 0; i < items.length; i++) {
      const updatedTask = { ...items[i], order: i };
      try {
        await fetch("/api/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
      } catch (error) {
        console.error("Error updating task order:", error);
      }
    }
  };

  // Drag and drop handler
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const items = reorder(tasks[source.droppableId], source.index, destination.index);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: items,
      }));
      await updateColumnOrder(source.droppableId, items);
      toast.success("Task order updated!");
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destinationItems = Array.from(tasks[destination.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      movedItem.status = destination.droppableId;
      destinationItems.splice(destination.index, 0, movedItem);
      setTasks((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }));
      await updateColumnOrder(source.droppableId, sourceItems);
      await updateColumnOrder(destination.droppableId, destinationItems);
      try {
        await fetch("/api/tasks", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movedItem),
        });
        toast.success("Task moved successfully!");
      } catch (error) {
        console.error("Error updating task status:", error);
        toast.error("Error updating task status.");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Task Manager
        </Typography>
        {/* Search and Sort Controls */}
        <Box sx={{ mb: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "space-between" }}>
          <TextField
            label="Search Tasks"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
          />
          <FormControl variant="outlined" size="small" sx={{ width: 180 }}>
            <InputLabel>Sort by Order</InputLabel>
            <Select
              label="Sort by Order"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* New Task Form */}
        <Card sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: "#fafafa" }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add New Task
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={newTask.status}
                    label="Status"
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  >
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="amber">Amber</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddTask}
                  startIcon={<AddIcon />}
                  sx={{ height: "100%" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Drag and Drop Context for Task Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            {["red", "amber", "green"].map((status) => (
              <Grid item xs={12} md={4} key={status}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: status === "red" ? "#e53935" : status === "amber" ? "#fb8c00" : "#43a047",
                  }}
                >
                  {status === "red"
                    ? "Red - Urgent"
                    : status === "amber"
                    ? "Amber - In Progress"
                    : "Green - Completed"}
                </Typography>
                <Droppable droppableId={status} isDropDisabled={false}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        minHeight: 200,
                        backgroundColor: snapshot.isDraggingOver ? "#f0f0f0" : "#fafafa",
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      {filteredTasks[status].map((task, index) => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          index={index}
                          onDelete={handleDeleteTask}
                          onArchive={handleArchiveTask}
                          onEdit={handleEditTask}
                        />
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Container>

      {/* Inline Editing Modal */}
      <Dialog open={Boolean(editingTask)} onClose={() => setEditingTask(null)}>
        <DialogTitle>Edit Task</DialogTitle>
        {editingTask && (
          <DialogContent>
            <TextField
              label="Title"
              name="title"
              fullWidth
              margin="dense"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="dense"
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            />
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={
                editingTask.dueDate
                  ? new Date(editingTask.dueDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={editingTask.status}
                label="Status"
                onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
              >
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="amber">Amber</MenuItem>
                <MenuItem value="green">Green</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setEditingTask(null)}>Cancel</Button>
          <Button onClick={handleSaveTask} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}
