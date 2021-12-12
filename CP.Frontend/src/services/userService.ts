import { GetUsersResult } from '../models/results/GetUsersResult';
import { getAxiosClient } from '../utils/getAxiosClient';

const getUsers = async (): Promise<GetUsersResult> => {
  try {
    const result = (await getAxiosClient().get('/api/user/list')).data;

    return {
      isSuccessful: true,
      users: result
    };
  } catch {
    return {
      isSuccessful: false
    };
  }
};

export const userService = {
  getUsers
};
