import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Paper, Box } from '@mui/material';
import { increment, decrement, reset } from '../redux/counterSlice';
import { useSpring, animated, config } from 'react-spring';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const backgroundAnimation = useSpring({
    backgroundColor: `rgba(25, 118, 210, ${Math.min(count / 20, 1)})`,
    config: { duration: 500 },
  });

  const buttonAnimation = useSpring({
    scale: count > 0 ? 1 : 0.95,
    config: config.wobbly,
  });

  return (
    <animated.div
      style={{
        ...backgroundAnimation,
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'transparent',
          padding: '20px',
          boxShadow: 'none'
        }}
      >
        {/* Counter Display */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: count > 10 ? 'white' : 'text.primary',
            transition: 'color 0.3s ease'
          }}
        >
          Count : {count}
        </Typography>

        {/* Buttons */}
        <animated.div style={buttonAnimation}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
              mt: 2
            }}
          >
            <Button
              variant="contained"
              onClick={() => dispatch(increment(1))}
              size="large"
              sx={{
                backgroundColor: count > 10 ? 'white' : 'primary.main',
                color: count > 10 ? 'primary.main' : 'white',
                '&:hover': {
                  backgroundColor: count > 10 ? 'rgba(255,255,255,0.9)' : 'primary.dark',
                }
              }}
            >
              +
            </Button>

            <Button
              variant="outlined"
              onClick={() => dispatch(reset())}
              size="large"
              sx={{
                borderColor: count > 10 ? 'white' : 'error.main',
                color: count > 10 ? 'white' : 'error.main',
                '&:hover': {
                  borderColor: count > 10 ? 'rgba(255,255,255,0.9)' : 'error.dark',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch(decrement(1))}
              size="large"
              disabled={count === 0}
            >
              -
            </Button>
          </Box>
        </animated.div>
      </Paper>
    </animated.div>
  );
};

export default Counter;

