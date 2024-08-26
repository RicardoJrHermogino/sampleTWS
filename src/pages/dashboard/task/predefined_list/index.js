import React from 'react';
import { Container, Typography, Paper, Grid, Box, IconButton, CssBaseline, Button } from '@mui/material';
import { ArrowBack, Edit as EditIcon } from '@mui/icons-material'; // Import EditIcon
import Navbar from '../../../components/navbar';
import { useRouter } from 'next/router'; // Import the useRouter hook

const PredefinedList = () => {
  const router = useRouter(); // Initialize the useRouter hook
  
  const handleGoBack = () => {
    router.back();
  };

  const handleGoToAddTask = () => {
    router.push('/dashboard/task/addtask'); // Navigate to the add task page
  };



  const industries = [
    { name: 'Agriculture Industry', tasks: generateTasks(10, 'Agriculture Task') },
    { name: 'Fishing Industry', tasks: generateTasks(10, 'Fishing Task') },
    { name: 'Construction Industry', tasks: generateTasks(10, 'Construction Task') },
    { name: 'Energy Industry', tasks: generateTasks(10, 'Energy Task') },
    { name: 'Shipping and Maritime Industry', tasks: generateTasks(10, 'Shipping Task') },
    { name: 'Tourism Industry', tasks: generateTasks(10, 'Tourism Task') }
  ];

  function generateTasks(count, prefix) {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `${prefix} ${index + 1}`,
    }));
  }

  const gradientStyle = {
    padding: "20px",
    borderRadius: "5px"
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ mt: 8 }}>
          <IconButton onClick={handleGoBack} sx={{ position: 'absolute', top: 15, left: 20 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ position: 'fixed', bottom: 90, right: 25, zIndex: 9999 }}>
            <Button 
              variant="contained"  
              onClick={handleGoToAddTask} 
              sx={{
                px:'20px',
                borderRadius: '15px', 
                mb: 3, 
                bgcolor:'white', 
                color:"black",
                boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)' // Increased shadow effect
              }}
            >
              <EditIcon sx={{ fontSize: 20, marginRight:'5px' }} /> Customize
            </Button>
          </Box>
          {industries.map((industry, index) => (
            <Grid key={index} container spacing={5} style={gradientStyle} justifyContent="center" mb={10}>
              <Grid item xs={12}>
                <Typography variant="h6" align="left"><strong>{industry.name}</strong></Typography>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container spacing={3}>
                  {industry.tasks.map(task => (
                    <Grid item xs={12} md={6} lg={4} key={task.id}>
                      <Paper style={{ padding: '10px', borderRadius: '5px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Typography>{task.name}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default PredefinedList;
