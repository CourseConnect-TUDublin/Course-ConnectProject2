// TaskForm.js
import React from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function TaskForm({ onSubmit, defaultValues, buttonText = "Add" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const submitHandler = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Card sx={{ p: 3, mb: 4, borderRadius: 2, backgroundColor: "#fafafa" }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {buttonText} Task
        </Typography>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                label="Title"
                fullWidth
                {...register("title", { required: "Title is required" })}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Description"
                fullWidth
                {...register("description")}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("dueDate", { required: "Due date is required" })}
                error={Boolean(errors.dueDate)}
                helperText={errors.dueDate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  defaultValue="red"
                  {...register("status")}
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
                type="submit"
                fullWidth
                startIcon={<AddIcon />}
                sx={{ height: "100%" }}
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
