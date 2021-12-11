import axios from 'axios';
import { APP_CONFIG } from '../constants/APP_CONFIG';

export const getAxiosClient = () => {
  return axios.create({ baseURL: APP_CONFIG.baseUrl });
};
