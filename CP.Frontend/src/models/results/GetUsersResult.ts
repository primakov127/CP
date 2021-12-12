import { Result } from './Result';

export type GetUsersResult = Result & {
  users?: Array<{
    fullName: string;
    userId: string;
  }>;
};
