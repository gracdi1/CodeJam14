import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:5173/dashboard&scope=user-read-private user-read-email playlist-read-private`;

function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #A8E063, #56AB2F)',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: `'Pacifico', cursive`,
          fontSize: '4rem',
          color: '#2E7D32',
          mb: 2,
        }}
      >
        personify
      </Typography>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 300 }}>
        What does your music taste say about you?
      </Typography>
      <Button
        href={SPOTIFY_AUTH_URL}
        variant="contained"
        sx={{
          backgroundColor: '#1DB954',
          color: '#fff',
          padding: '10px 20px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#1ed760',
          },
        }}
      >
        Log in with Spotify
      </Button>
      <Box sx={{ position: 'absolute', bottom: '20px', color: '#fff' }}>
        <Typography variant="subtitle2">
          made by: Gracie, Ariane, Nathan & Richie
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>🎵</Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
