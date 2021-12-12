import { atom } from 'recoil';
import jwt_decode from 'jwt-decode';
import { User } from '../models/User';

export const userState = atom<User>({
  key: 'user-key',
  default: localStorage.getItem('token')
    ? jwt_decode(localStorage.getItem('token') as string)
    : ({} as User)
});
