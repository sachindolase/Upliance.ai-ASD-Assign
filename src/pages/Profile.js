import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, Box } from '@mui/material';
import { useSpring, animated } from 'react-spring';

function Profile() {
  const currentUser = useSelector((state) => state.user.userData);

  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } });

  return (
    <animated.div style={fadeIn}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper elevation={3} sx={{ padding: 4, width: 400, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>User Profile</Typography>
          {currentUser ? (
            <Box textAlign="left">
              <Typography variant="body1"><strong>Username:</strong> {currentUser.username}</Typography>
            </Box>
          ) : (
            <Typography variant="body1">No user data available</Typography>
          )}
        </Paper>
      </Box>
    </animated.div>
  );
}

export default Profile;
