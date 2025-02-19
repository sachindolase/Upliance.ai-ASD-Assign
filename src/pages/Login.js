import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';
import { TextField, Button, Box, Typography, Paper, Divider, IconButton } from '@mui/material';
import { useSpring, animated, config } from 'react-spring';
import { Google } from '@mui/icons-material';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      dispatch(login({ username: credentials.username }));
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses
  });

  const slideUp = useSpring({
    from: { transform: 'translateY(100px)' },
    to: { transform: 'translateY(0)' },
    config: config.wobbly
  });

  const titleSpring = useSpring({
    from: { transform: 'scale(0.8)' },
    to: { transform: 'scale(1)' },
    config: config.stiff
  });

  return (
    <animated.div style={fadeIn}>
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 2
        }}
      >
        <animated.div style={slideUp}>
          <Paper elevation={6} sx={{
            padding: 4,
            width: 400,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <animated.div style={titleSpring}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 4
                }}
              >
                Welcome Back
              </Typography>
            </animated.div>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                sx={{ mb: 3 }}
                InputProps={{ sx: { borderRadius: 2 } }}
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                sx={{ mb: 3 }}
                InputProps={{ sx: { borderRadius: 2 } }}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign In
              </Button>

              <Divider sx={{ my: 3, color: 'text.secondary' }}>OR</Divider>

              <Button
                variant="outlined"
                fullWidth
                size="large"
                startIcon={<Google />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 'bold',
                  color: '#db4437',
                  borderColor: '#db4437',
                  '&:hover': {
                    borderColor: '#db4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.1)'
                  }
                }}
              >
                Continue with Google
              </Button>

              <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
                Don't have an account?{' '}
                <Button 
                  size="small" 
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  onClick={() => navigate('/signup')}
                >
                  Create one
                </Button>
              </Typography>
            </form>
          </Paper>
        </animated.div>
      </Box>
    </animated.div>
  );
}

export default Login;