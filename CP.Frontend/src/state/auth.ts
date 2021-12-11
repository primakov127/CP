import { atom } from 'recoil';

export const authState = atom({
  key: 'auth-key',
  default: localStorage.getItem('token') ?? ''
});
