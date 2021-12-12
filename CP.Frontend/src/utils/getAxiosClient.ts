import axios from 'axios';
import { APP_CONFIG } from '../constants/APP_CONFIG';

export const getAxiosClient = () => {
  const token = localStorage.getItem('token');
  const headers = token
    ? {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    : undefined;

  return axios.create({ baseURL: APP_CONFIG.baseUrl, headers });
};
