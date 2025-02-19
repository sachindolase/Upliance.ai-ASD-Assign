import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useSpring, animated } from 'react-spring';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    dispatch(login({ username: formData.username, email: formData.email }));
    navigate('/');
  };

  return (
    <animated.div style={fadeIn}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 2
        }}
      >
        <Paper elevation={6} sx={{
          padding: 4,
          width: 500,
          height: 'auto',
          textAlign: 'center',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4 
            }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{
                mb: 2,
                '& .MuiInputBase-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                borderRadius: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Box>
    </animated.div>
  );
}

export default Signup;
