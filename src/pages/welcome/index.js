  import React from 'react';
  import { Container, Typography, Button, Grid, CssBaseline } from '@mui/material'; // Import useTheme hook
  import Image from "next/image";
  import { useRouter } from 'next/router';

  const WelcomeDashboard = () => {
    const router = useRouter();

    const gradientStyle = {
      padding: "20px",
      borderRadius: "5px",
    };

    const handleGetStartedClick = () => {
      router.push('/login'); // Change '/login' to your actual login page route
    };

    return (
      <>
      <CssBaseline/>
      <Container maxWidth="sm">
        <Grid container justifyContent="center" spacing={3} style={gradientStyle}>
          <Grid item xs={12} md={12} mt={7} >
            <Typography variant="h5" align="center" gutterBottom>
              <strong> Discover TaskWeatherSync Smart Scheduler</strong> 
            </Typography>
          </Grid>

          <Grid container justifyContent="center" alignItems="center" mt={2} item xs={6}>
            <Image src="/3d-weather-icons/sun/16.png" alt="sample" width={260} height={260} />
          </Grid>

          <Grid item xs={12} sm={6} md={12} mt={7} >
            <Typography variant="body2" align="center" mb={3} gutterBottom sx={{color: 'gray'}}>
              TaskWeatherSync: Start Your Weather-Informed Task Management Journey Now
            </Typography>
            
            <Button 
              variant="contained" 
              fullWidth 
              sx={{ 
                borderRadius: '20px', 
                fontWeight: 'bold', 
                height: '55px',
                bgcolor:'black'
              }}
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
      </>
    );
  };

  export default WelcomeDashboard;
