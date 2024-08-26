import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container, Button, Grid, TextField, Typography, CssBaseline, Alert } from "@mui/material";
import { Google as GoogleIcon } from '@mui/icons-material';

export default function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    // Check if email and password are provided
    if (!email || !password) {
      setError('Please provide both email and password');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users?email=${email}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const users = await response.json();
      if (users.length === 0) {
        throw new Error('User not found');
      }

      const user = users[0];
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Store userId in localStorage
      localStorage.setItem('userId', user.id);

      // Redirect to dashboard without userId in query
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google login logic
    console.log("Google login clicked");
  };

  return (
    <>
      <CssBaseline/>
      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center" mt={5}>
        <Grid item md={7} xs={10}>
              <Typography variant="h5" align="start">Login to <Typography>TaskWeatherSync</Typography></Typography>
              
            </Grid>
          <Grid item xs={10}>
            {error && <Alert severity="error" sx={{ mb: 2, justifyContent: 'center' }}>{error}</Alert>}
          </Grid>
          <Grid item xs={10} mt={10}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={9}>
            <Typography sx={{ fontSize: 'small' }}>Forgot Password?</Typography>
          </Grid>

          <Grid item xs={10}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLogin}
              sx={{ height: "55px", borderRadius: "12px", color: "white" }}
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={10} sx={{ textAlign: "center"}}>
            <Typography sx={{ fontSize: 'small' }}>OR</Typography>
          </Grid>

          <Grid item xs={10}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
              sx={{ height: "55px", borderRadius: "12px", color: "black", borderColor: "black" }}
            >
              Continue with Google
            </Button>
          </Grid>

          <Grid item mb={7} mt={3}>
          <Typography sx={{ fontSize: 'small' }}>
              {`Don't have an account? `}
              <Link href="/signup">Register here.</Link>
          </Typography>

          </Grid>
          

        </Grid>
      </Container>
    </>
  );
}
