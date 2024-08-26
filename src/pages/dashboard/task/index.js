import React from 'react';
import { Container, Grid, Typography, CssBaseline, Button, FormHelperText, Paper, IconButton, Badge } from '@mui/material';
import Navbar from '../../components/navbar';
import { useRouter } from 'next/router';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings'; // Import the settings icon
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the notifications icon

const gradientStyle = {
  padding: "20px",
  borderRadius: "5px"
};

const bottomLineStyle = {
  borderBottom: "0.5px solid gray",
  padding: "10px 15px",
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
};

const iconStyle = {
  marginRight: '20px',
  fontSize: '30px' // Adjust the font size here to make the icons bigger
};

const Tasks = () => {
  const router = useRouter();

  const handleAllScheduledTask = () => {
    router.push('/dashboard/task/all_scheduled');
  };

  const handleFavorableTask = () => {
    router.push('/dashboard/task/favorable_task');
  };

  const handleAffectedTask = () => {
    router.push('/dashboard/task/affected_task');
  };

  const handleAddNewTask = () => {
    router.push('/dashboard/task/predefined_list');
  };

  const handleSeeMore = () => {
    router.push('/dashboard/task/restricted_task');
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Grid container spacing={5} style={gradientStyle} mb={15} justifyContent={'center'}>
        <Grid item xs={6}>
          <Typography variant="h4"><strong>Task</strong></Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton onClick={() => router.push('/dashboard/notifications')}>
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={() => router.push('/dashboard/profile')}>
              <SettingsIcon />
            </IconButton>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography> <strong>Schedule Your Task</strong></Typography>
        </Grid>

        <Grid item xs={12} md={10} align="center">
          <Button onClick={handleAddNewTask} variant="contained" sx={{ borderRadius: '20px', bgcolor: 'black', minWidth:'90%' }}>
            Add New Task
          </Button>
          <FormHelperText sx={{ textAlign: 'center' }}>Schedule your planned task here.</FormHelperText>
        </Grid>

        <Grid item xs={12} md={4}>
            <Grid container>
              <Grid item xs={12} sx={{...bottomLineStyle}} onClick={handleAllScheduledTask}>
                  <AssignmentIcon sx={{  marginRight: '29px', fontSize: '23px'}} />
                  <Typography variant="subtitle1" sx={{fontSize: '0.9rem'}}>All Scheduled Task</Typography>
                  <ArrowForwardIosIcon sx={{ fontSize: '0.875rem', marginLeft: '119px' }} />
            </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{...bottomLineStyle}} onClick={handleFavorableTask}>
                  <AssignmentTurnedInIcon sx={{  marginRight: '29px', fontSize: '23px'}} />
                  <Typography variant="subtitle1" sx={{fontSize: '0.9rem'}}>Favorable Schedule</Typography>
                  <ArrowForwardIosIcon sx={{ fontSize: '0.875rem', marginLeft: '110px' }} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sx={{...bottomLineStyle}} onClick={handleAffectedTask}>
                  <AssignmentLateIcon sx={{  marginRight: '26px', fontSize: '25px'}} />
                  <Typography variant="subtitle1" sx={{fontSize: '0.9rem'}}>Affected Schedule</Typography>
                  <ArrowForwardIosIcon sx={{ fontSize: '0.875rem', marginLeft: '120px' }} />
              </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography><strong>Restricted Activity Today</strong></Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={5} style={{padding:'20px', borderRadius: '20px', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }}>
              <Grid container textAlign={'center'} spacing={1} p={1}>
                  <React.Fragment>
                    <Grid item xs={12} md={4}>
                      <Typography>Harvest Rice</Typography>
                    </Grid>
                      <Grid item xs={12} >
                        <hr style={{ borderTop: '1px solid gray' }} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Typography>Harvest Rice</Typography>
                    </Grid>
                      <Grid item xs={12} >
                        <hr style={{ borderTop: '1px solid gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Typography>Harvest Rice</Typography>
                    </Grid>
                      <Grid item xs={12} >
                        <hr style={{ borderTop: '1px solid gray', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
                      </Grid>
                  </React.Fragment>
              </Grid>
              <Grid item xs={12} textAlign={'center'}>
                <Button onClick={handleSeeMore}>See More</Button>
              </Grid>
            </Paper>
        </Grid>   

      </Grid>
    </>
  );
};

export default Tasks;
