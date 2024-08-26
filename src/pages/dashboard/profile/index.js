import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CssBaseline, Paper, Button, Avatar } from "@mui/material";
import Navbar from "../../components/navbar";
import { useRouter } from 'next/router';
import Image from "next/image";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
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
          setProfile(userData);  // Use setProfile instead of setUser
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    } else {
      // If no userId is found, redirect to login page or handle accordingly
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container mt={10} spacing={3} justifyContent="center">
          <Grid item xs={12} mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Profile
            </Typography>
          </Grid>
          <Grid item xs={12} align="center" mb={1}>
            <Paper
              sx={{
                position: 'relative', 
                borderRadius: 5,
                p: 4,
                textAlign: "center",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", 
                transition: "box-shadow 0.3s", 
                "&:hover": {
                  boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)", 
                  cursor: "pointer", 
                },
              }}
            >
              <Button 
                variant="contained" 
                onClick={handleLogout} 
                sx={{ 
                  borderRadius:'17px',
                  position: 'absolute',
                  bgcolor:'black',
                  top: 35, 
                  right: 30, 
                  zIndex: 1 
                }}
              >
                Log out
              </Button>
              <Avatar
                alt={profile ? profile.fullName : "Loading..."}  // Handle case when profile is null
                src="/avatar.jpg" 
                sx={{ width: 50, height: 50, marginBottom: 2 }}
              />
              <Image src="/image/profile_display.png" alt="sample" width={160} height={140} />
              <Typography variant="h6" gutterBottom>
                <strong>{profile ? profile.fullName : "Loading..."}</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>{profile ? profile.email : "Loading..."}</Typography>
              <Typography variant="body2" gutterBottom>Industry: {profile ? profile.workType : "Loading..."}</Typography> 
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
