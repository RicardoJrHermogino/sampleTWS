import React, { useState } from 'react';
import { Grid, Typography, CssBaseline, Card, CardContent, Container, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import { ArrowBack, Edit as EditIcon, Delete as DeleteIcon, AddCircle as AddCircleOutlineOutlinedIcon } from '@mui/icons-material'; // Added AddIcon
import { useRouter } from 'next/router';
import Navbar from '../../../components/navbar';

const initialTasks = {
  AllScheduledTask: [
    { id: 1, name: 'Transplanting Rice Seedlings', location: 'Rice Paddy', date: '2024-05-06', time: '08:00' },
    { id: 2, name: 'Fertilizing Rice Fields', location: 'Rice Terrace', date: '2024-05-07', time: '09:30' },
    { id: 3, name: 'Weeding Rice Plants', location: 'Rice Farm', date: '2024-05-08', time: '11:00' },
    { id: 4, name: 'Monitoring Water Levels', location: 'Irrigation Canal', date: '2024-05-09', time: '13:00' },
    { id: 5, name: 'Harvesting Rice Grains', location: 'Harvesting Field', date: '2024-05-10', time: '10:30' },
  ],
};

const gradientStyle = {
  padding: "20px",
  borderRadius: "5px"
};

const AffectedTask = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState(initialTasks);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  const handleGoBack = () => {
    router.back();
  };

  const handleTaskDelete = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    setTasks(prevTasks => ({
      AllScheduledTask: prevTasks.AllScheduledTask.filter(t => t.id !== selectedTask.id)
    }));
    setOpenDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  const handleTaskEdit = (task) => {
    setEditedTask(task);
    setOpenDialog(true);
  };

  const handleEditConfirm = () => {
    const updatedTasks = tasks.AllScheduledTask.map(t =>
      t.id === editedTask.id ? editedTask : t
    );
    setTasks({ AllScheduledTask: updatedTasks });
    setOpenDialog(false);
  };

  const handleEditCancel = () => {
    setEditedTask(null);
    setOpenDialog(false);
  };

  const handleAddNewTask = () => {
    router.push('/dashboard/task/addtask');
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={5} style={gradientStyle} justifyContent="center" mb={10}>
          <IconButton onClick={handleGoBack} sx={{ position: 'absolute', top: 15, left: 20 }}>
            <ArrowBack />
          </IconButton>
          <Grid item xs={12} mt={8}>
            <Typography variant="h4" align="left"><strong>Task</strong></Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" color="error">The following scheduled tasks do not meet the weather conditions. Please reschedule.</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom align="left"><strong> All Affected Task</strong></Typography>
            <Grid container spacing={2} mt={1}>
              {tasks.AllScheduledTask.map((task, index) => (
                <Grid item key={task.id} xs={12}>
                  <Card style={{ position: 'relative', zIndex: tasks.AllScheduledTask.length - index }}>
                    <CardContent>
                      <Typography variant="subtitle1">{task.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{task.location}</Typography>
                      <Typography variant="body2" color="textSecondary">{task.date}</Typography>
                      <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <IconButton aria-label="edit" onClick={() => handleTaskEdit(task)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleTaskDelete(task)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ position: 'fixed', bottom: 90, right: 25, zIndex: 9999 }}>
            <IconButton aria-label="add" onClick={handleAddNewTask}>
              <AddCircleOutlineOutlinedIcon sx={{ fontSize: '54px' }} />
            </IconButton>
          </Box>
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={handleEditCancel}>
        <DialogTitle>{editedTask ? 'Edit Task' : 'Confirm Delete'}</DialogTitle>
        <DialogContent>
          {editedTask ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                defaultValue={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
              />
              <TextField
                margin="dense"
                id="location"
                label="Location"
                fullWidth
                defaultValue={editedTask.location}
                onChange={(e) => setEditedTask({ ...editedTask, location: e.target.value })}
              />
              <TextField
                margin="dense"
                id="date"
                label="Date"
                fullWidth
                defaultValue={editedTask.date}
                onChange={(e) => setEditedTask({ ...editedTask, date: e.target.value })}
              />
            </>
          ) : (
            <Typography>Are you sure you want to delete {selectedTask?.name}?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={editedTask ? handleEditCancel : handleDeleteCancel}>Cancel</Button>
          <Button onClick={editedTask ? handleEditConfirm : handleDeleteConfirm} color="error">
            {editedTask ? 'Save' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AffectedTask;
