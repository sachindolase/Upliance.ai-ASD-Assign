import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: JSON.parse(localStorage.getItem('users') || '[]'),
  isAuthenticated: false,
  userData: null
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem('users', JSON.stringify(action.payload));
    }
  }
});

export const { login, logout, addUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
