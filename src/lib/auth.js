// lib/auth.js
import api from './api';

export const loginUser = async (data) => {
  const res = await api.post('/', data);
  return res;
};

export const registerUser = async (data) => {
  const res = await api.post('/register', data);
  return res.data;
};

export const fetchMe = async () => {
  const res = await api.get('/me');
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post('/logout', {
    credentials: 'include',
  });
  return res;
};