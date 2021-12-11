import { Login } from '../models/messages/Login';
import { getAxiosClient } from '../utils/getAxiosClient';
import { LoginResult } from '../models/results/LoginResult';

const login = async (message: Login): Promise<LoginResult> => {
  try {
    const result = (await getAxiosClient().post('/api/auth/login', message)).data;

    return {
      ...result,
      isSuccessful: true
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

export const authService = {
  login
};
