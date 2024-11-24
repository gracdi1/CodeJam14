import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import spotifyFullLogo from '../assets/Spotify_Full_Logo_RGB_Black.png';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';

const LoginPage = () => {
    const handleLogin = () => {
      window.location.href = 'http://localhost:3000/login'; // Redirect to backend's /login
    };


    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, #87D4A2, #FFFFFF)',
            textAlign: 'center',
            color: '#fff',
            fontFamily: `'Roboto Mono', monospace`, // Global font for Box
        }}
        >
        <Typography
            variant="h1"
            sx={{
            fontFamily: `'Rubik Bubbles', cursive`, // Title-specific font
            fontSize: '6rem',
            color: '#2E7D32',
            mb: 2,
            }}
        >
            personify
        </Typography>
        <Typography
            variant="h5"
            sx={{
            mb: 4,
            fontWeight: 500,
            fontFamily: `'Roboto Mono', monospace`,
            color: '#0F662E'
            }}
        >
            What does your music taste say about you?
        </Typography>

        {/* Updated Button with Spotify Logo */}
        <Button
            onClick={handleLogin}
            variant="contained"
            sx={{
            backgroundColor: '#1DB954',
            color: '#fff',
            padding: '10px 40px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'none',
            fontFamily: `'Roboto Mono', monospace`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Pushes logo to the right
            gap: '10px', // Space between text and logo
            borderRadius: '30px',
            '&:hover': {
                backgroundColor: '#1ed760',
            },
            }}
        >
            <span>Log in with</span>
            <Box
                component="img"
                src={spotifyFullLogo}
                alt="Spotify Logo"
                sx={{
                width: '80px', // Adjust size for the full logo
                height: 'auto', // Maintain aspect ratio
                ml: '8px', // Add margin to separate text and logo
                }}
            />
        </Button>

        {/* Updated Footer */}
        <Box
            sx={{
            position: 'absolute',
            bottom: '20px',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column', // Stack vertically
            alignItems: 'center', // Center horizontally
            textAlign: 'center', // Center the text
            gap: '4px', // Space between icon and text
            }}
        >
            <MusicNoteOutlinedIcon sx={{ fontSize: '24px', color: '#0F662E' }} />
            <Typography
            variant="subtitle2"
            sx={{
                fontFamily: `'Roboto Mono', monospace`,
                color: '#0F662E'
            }}
            >
            made by: Gracie, Ariane, Nathan & Richie
            </Typography>
        </Box>
        </Box>
    );
}

export default LoginPage;
