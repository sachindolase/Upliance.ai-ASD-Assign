import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import counterReducer from './counterSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer
  }
});