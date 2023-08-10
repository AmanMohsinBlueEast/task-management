import React, { useState } from "react";
import {
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  Divider,
  Stack,
  TextField,
  Container,
} from "@mui/material";
import TasksList from "./components/TasksList";

const TaskManagement = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentGroup, setCurrentGroup] = useState("default");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTask = () => {
    if (title.trim() === "" || desc.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      desc,
      completed: false,
    };

    setTasks([...tasks, { ...newTask, group: currentGroup }]);
    setTitle("");
    setDesc("");
    handleClose();
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newItems = [...tasks];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    console.log("new items ====>", newItems);
    setTasks(newItems);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {/* modal to add task */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Task
            </Typography>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Stack>

          <Stack
            spacing={3}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Button variant="contained" onClick={addTask}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <h1>Task Management System</h1>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2}>
          <Button variant="contained" onClick={handleOpen}>
            Add New Task
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <TasksList
        tasks={tasks}
        completionHandler={(id) => toggleTaskCompletion(id)}
        deletionHandler={(id) => deleteTask(id)}
        dragHandler={onDragEnd}
      />
    </div>
  );
};

export default TaskManagement;
