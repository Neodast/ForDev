import User from '../models/User';

export type AuthResponse = {
  accessToken: string;
  user: User;
};