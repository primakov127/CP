import { Result } from './Result';

export type LoginResult = Result & {
  userId?: string;
  token?: string;
};
