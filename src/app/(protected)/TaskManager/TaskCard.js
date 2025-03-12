// TaskCard.js
import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Archive as ArchiveIcon } from "@mui/icons-material";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

export default function TaskCard({ task, index, onDelete, onEdit, onArchive }) {
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
                  <IconButton size="small" onClick={() => onEdit(task)} aria-label="edit task">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(task._id)} aria-label="delete task">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  {task.status === "green" && (
                    <IconButton size="small" onClick={() => onArchive(task._id)} aria-label="archive task">
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
