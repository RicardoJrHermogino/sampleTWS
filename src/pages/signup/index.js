import React, { useState } from 'react';
import { Container, Grid, Typography, Link, TextField, Button, CssBaseline, MenuItem, Select, FormControl, FormHelperText, Alert, InputLabel } from "@mui/material";
import { useRouter } from 'next/router';
import Image from 'next/image'; // Import Image component from Next.js
import { Google as GoogleIcon } from '@mui/icons-material'; // Importing Google icon


export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [workType, setWorkType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = () => {
    // Handle Google login logic here (for now, just a placeholder)
    console.log("Google login clicked");
  };


  const handleSignUp = async () => {
    // Validate form fields
    if (!fullName || !workType || !email || !password || !confirmPassword) {
      setError('Please fill up all fields');
      return;
    }
  
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send POST request to JSON Server to add new user
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          workType,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      // Redirect to verification page after successful signup
      router.push('/signup/verification');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again later.');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const initialWorkTypes = [
    'Agriculture Industry', 
    'Fishing Industry', 
    'Construction Industry', 
    'Energy Industry', 
    'Shipping and Maritime Industry', 
    'Tourism Industry'
  ];

  return (
    <>
      <CssBaseline />
      <Container maxWidth="large">
        <Grid container spacing={2} mt={5}>
          <Grid container spacing={2} justifyContent="center" alignItems="center" item xs={12} md={6}>
            <Grid item md={7} xs={10}>
              <Typography variant="h5" align="start">Register to <Typography>TaskWeatherSync</Typography></Typography>
              
            </Grid>
            <Grid item md={7} xs={10}>
              {error && <Alert severity="error" fullWidth>{error}</Alert>}
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                required
                sx={{ height: '80%' }}
              />
            </Grid>
            
            <Grid item md={7} xs={10}>
              <FormControl fullWidth required sx={{ minWidth: 120 }}>
                <InputLabel id="work-type-label">Industry Sector</InputLabel>
                <Select
                  labelId="work-type-label"
                  id="work-type-select"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  label="Industry Sector"
                >
                  {initialWorkTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose your industry sector</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                error={!!error}
              />
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
                error={!!error}
              />
            </Grid>
            <Grid item md={7} xs={10} mt={2}>
              <Button 
                variant="contained" 
                fullWidth 
                onClick={handleSignUp} 
                sx={{
                  height: "55px",
                  borderRadius: "12px",
                  color: "white", // Text color
                }}
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item xs={8} sx={{ textAlign: "center"}}>
            <Typography sx={{ fontSize: 'small' }}>OR</Typography>
          </Grid>

            <Grid item md={7} xs={10} mb={5}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ height: "55px", borderRadius: "12px",  color: "black", borderColor: "black" }}
            >
              Continue with Google
            </Button>
            </Grid>
            
            <Grid item md={7} xs={10} mb={7}>
              <Typography variant="body2" align="center" >
                  Already have an account? <Link href="/login">Login here.</Link>
              </Typography>
            </Grid>

            

          

          </Grid>
        </Grid>
      </Container>
    </>
  );
}
