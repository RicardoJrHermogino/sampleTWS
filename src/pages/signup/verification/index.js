import React, { useState, useRef } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { useRouter } from 'next/router'; 

export default function EmailVerification() {
    const [codes, setCodes] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const router = useRouter(); 

    const gradientStyle = {
        padding: "20px",
        borderRadius: "5px"
      };

    const handleCodeChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const verificationCode = codes.join('');
        console.log(verificationCode); 

        router.push('/login'); 
    };

    const handleBack = () => {
        router.back();
    };

    const handleResendCode = () => {
        console.log("Resend code");
    };

    return (
        <Container maxWidth="sm" sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Grid container justifyContent="center" spacing={3} style={gradientStyle}>
            <Grid item xs={12}>
            <Button onClick={handleBack} style={{ position: 'absolute', top: '1rem', left: '1rem' }}> Back</Button>
            <Typography variant="h4" gutterBottom>Email Verification</Typography>
            <Typography variant="body1">Enter verification code we sent to <strong>user@example.com</strong>.</Typography>
            
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    {codes.map((code, index) => (
                        <Grid item xs={2} key={index}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                inputProps={{ maxLength: 1, pattern: "[0-9]" }}
                                required
                                value={code}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                autoFocus={index === 0}
                                inputRef={(input) => inputRefs.current[index] = input} 
                            />
                        </Grid>
                    ))}
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '1rem', borderRadius:'10px', backgroundColor:'black' }}>Verify</Button>
            </form>
            <Button onClick={handleResendCode} variant="outlined" color="primary" fullWidth style={{ marginTop: '1rem', borderRadius:'10px' }}>Resend Code</Button>
            </Grid>
            </Grid>
        </Container>
    );
}
