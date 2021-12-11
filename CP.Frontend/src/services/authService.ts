import { Login } from '../models/messages/Login';
import { getAxiosClient } from '../utils/getAxiosClient';
import { LoginResult } from '../models/results/LoginResult';
import { Register } from '../models/messages/Register';
import { Result } from '../models/results/Result';
import { RequestPasswordReset } from '../models/messages/RequestPasswordReset';
import { ResetPassword } from '../models/messages/ResetPassword';

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

const register = async (message: Register): Promise<Result> => {
  try {
    await getAxiosClient().post('/api/auth/register', message);

    return {
      isSuccessful: true
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

const requestPasswordReset = async (message: RequestPasswordReset): Promise<Result> => {
  try {
    await getAxiosClient().post('/api/auth/requestpasswordreset', message);

    return {
      isSuccessful: true
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

const resetPassword = async (message: ResetPassword): Promise<Result> => {
  try {
    await getAxiosClient().post('/api/auth/resetpassword', message);

    return {
      isSuccessful: true
    }
  } catch {
    return {
      isSuccessful: false
    }
  }
}

export const authService = {
  login,
  register,
  requestPasswordReset,
  resetPassword
};
