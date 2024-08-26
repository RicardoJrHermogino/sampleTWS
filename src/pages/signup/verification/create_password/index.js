import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';

export default function PasswordVerification() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        router.push('/login'); 
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography textAlign={'center'} variant="h5" mb={5} gutterBottom>Password Verification</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={10}>
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            required
                            error={password !== confirmPassword}
                            helperText={error}
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem', borderRadius:'20px',height:'50px', backgroundColor:'black'  }}>Continue</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
