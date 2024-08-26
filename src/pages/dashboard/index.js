import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, CssBaseline, Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, IconButton, Badge } from "@mui/material";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Navbar from "../components/navbar";
import Image from "next/image";
import { useRouter } from 'next/router';
import SettingsIcon from '@mui/icons-material/Settings'; // Import the settings icon
import NotificationsIcon from '@mui/icons-material/Notifications'; // Import the notifications icon

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [allowWeather, setAllowWeather] = useState(true); // Directly set weather display to true
  const [totalTasks, setTotalTasks] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/users/${storedUserId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    } else {
      router.push('/login');
    }

    // Fetch total number of scheduled tasks
    const fetchTotalTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tasks?userId=${storedUserId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        setTotalTasks(tasks.length);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (storedUserId) {
      fetchTotalTasks();
    }
  }, [router]);

  const TaskButton = () => {
    router.push('/dashboard/task'); 
  };

  const currentDate = dayjs().format("MMMM DD, YYYY");
  const currentDay = dayjs().format("dddd");

  return (
    <>
      <CssBaseline/>
      <Navbar/>
      <Grid container mb={15} spacing={6} style={{ padding: "20px", borderRadius: "5px" }}>

        <Grid item xs={6}>
          <Typography variant="h4"><strong>Home</strong></Typography>
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
        <Grid item xs={10}>
          <Typography variant="body2" color="#757575" >
            Good Morning,
          </Typography>
          <Typography variant="h5">{user ? user.fullName : "Loading..."}</Typography>
        </Grid>

        {allowWeather && (
          <>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Image src="/3d-weather-icons/moon/1.png" alt="sample" width={160} height={140} />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "center" }}>
              <Typography sx={{ letterSpacing: 8 }}>Rainy Night</Typography>
              <Typography variant="h2">22&deg;C</Typography>
              <Typography>
                <strong>{currentDay}</strong>{" "}
                <span style={{ color: "#757575" }}>{currentDate}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Typography sx={{ mb: 1 }}><strong>Consider bringing an umbrella with you.</strong></Typography>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button onClick={TaskButton}>
            <Card sx={{ borderRadius: 5, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', minHeight:'100%' }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={12} textAlign={'center'}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Task Summary</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell>Number</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Total Scheduled Tasks</TableCell>
                            <TableCell><Typography sx={{color:'blue'}}>{totalTasks}</Typography></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Scheduled Tasks Favorable to Weather</TableCell>
                            <TableCell><Typography sx={{color:'green'}}>10</Typography></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Scheduled Tasks affected by weather</TableCell>
                            <TableCell><Typography sx={{color:'red'}}>3</Typography></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Restricted Tasks Today</TableCell>
                            <TableCell>16</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Button>
        </Grid>

        {allowWeather && (
          <Grid item xs={12}>
            <Typography color="#757575" sx={{fontSize: '0.8rem'}} textAlign={'center'}>
              The average temperature for the next 5 days will be 21 degrees, it will rain for 7 days
            </Typography>
          </Grid>
        )}

        {allowWeather && (
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: "#292929", borderRadius: 5 }}>
              <CardContent>
                <Grid container spacing={6} sx={{ textAlign: "center" }}>
                  <Grid item xs={4}>
                    <Icon icon="uil:cloud-wind" color="#fff" fontSize={45} />
                    <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                      136
                    </Typography>
                    <Typography color="#b3b3b3">Air Quality</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Icon icon="lets-icons:pressure" color="#fff" fontSize={45} />
                    <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                      846hpa
                    </Typography>
                    <Typography color="#b3b3b3">Pressure</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Icon icon="mdi:uv-ray-outline" color="#fff" fontSize={45} />
                    <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                      2
                    </Typography>
                    <Typography color="#b3b3b3">UV</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Icon icon="mingcute:rain-line" color="#fff" fontSize={45} />
                    <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                      4mm
                    </Typography>
                    <Typography color="#b3b3b3">Precipitation</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Icon icon="bx:wind" color="#fff" fontSize={45} />
                    <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                      11km/h
                    </Typography>
                    <Typography color="#b3b3b3">Wind</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Icon icon="ph:eye-bold" color="#fff" fontSize={45} />
                    <Typography variant="h6" color="#fff" sx={{ mt: 1 }}>
                      6.4 km
                    </Typography>
                    <Typography color="#b3b3b3">Visibility</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

      </Grid>
    </>
  );
};

export default Dashboard;
