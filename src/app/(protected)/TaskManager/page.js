"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useTasks } from "./useTasks";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

// Helper for reordering items in a list
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function TaskManager() {
  const { data: session } = useSession();
  const userId = session?.user?.id || session?.user?.sub;
  const { tasks, fetchTasks, addTask, updateTask, deleteTask, archiveTask, setTasks } = useTasks(userId);

  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId, fetchTasks]);

  // Filter and sort tasks based on search term and order
  const filteredTasks = Object.keys(tasks).reduce((acc, status) => {
    acc[status] = tasks[status]
      .filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (sortOrder === "asc" ? a.order - b.order : b.order - a.order));
    return acc;
  }, {});

  // Batch update for drag and drop order
  const updateColumnOrder = async (status, items) => {
    for (let i = 0; i < items.length; i++) {
      const updatedTask = { ...items[i], order: i };
      await updateTask(updatedTask);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const items = reorder(tasks[source.droppableId], source.index, destination.index);
      setTasks((prev) => ({ ...prev, [source.droppableId]: items }));
      await updateColumnOrder(source.droppableId, items);
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
      await updateTask(movedItem);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Responsive container: adjust padding for mobile vs. larger screens */}
      <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Task Manager
        </Typography>
        {/* Search and Sort Controls */}
        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "space-between",
          }}
        >
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
        <TaskForm
          onSubmit={(data) => {
            if (!userId) {
              toast.error("User information is still loading. Please try again.");
              return;
            }
            const columnTasks = tasks[data.status] || [];
            const order = columnTasks.length;
            addTask({
              ...data,
              dueDate: new Date(data.dueDate).toISOString(),
              userId,
              order,
            });
          }}
        />

        {/* Drag & Drop Task Columns */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container spacing={3}>
            {["red", "amber", "green"].map((status) => (
              <Grid item xs={12} md={4} key={status}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color:
                      status === "red"
                        ? "#e53935"
                        : status === "amber"
                        ? "#fb8c00"
                        : "#43a047",
                  }}
                >
                  {status === "red"
                    ? "Red - Urgent"
                    : status === "amber"
                    ? "Amber - In Progress"
                    : "Green - Completed"}
                </Typography>
                <Droppable droppableId={status}>
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
                          onDelete={deleteTask}
                          onArchive={archiveTask}
                          onEdit={(task) => setEditingTask(task)}
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

      {/* Inline Edit Modal */}
      <Dialog open={Boolean(editingTask)} onClose={() => setEditingTask(null)}>
        <DialogTitle>Edit Task</DialogTitle>
        {editingTask && (
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={editingTask.title}
              onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              value={editingTask.description}
              onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            />
            <TextField
              label="Due Date"
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
          <Button
            onClick={() => {
              updateTask(editingTask);
              setEditingTask(null);
            }}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}
