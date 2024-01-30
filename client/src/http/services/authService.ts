import api from '..';
import { AxiosResponse } from 'axios';

interface IAuth {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuth>> {
    return api.post<IAuth>('/auth/login', { email, password });
  }
}
