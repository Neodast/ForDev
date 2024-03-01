import api from '..';
import { AxiosResponse } from 'axios';
import IUser from '../../models/IUser';

interface IAuth {
  tokens: ITokenDto
  user: IUser;
}

interface ITokenDto {
  accessToken: string;
  refreshToken: string;
}



export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuth>> {
    return await api.post<IAuth>('/auth/login', { email, password });
  }

  static async logout(): Promise<void> {
    return api.post(`auth/logout`);
  }

  static async registration(email: string, password: string) {
    return api.post<IAuth>('/auth/registration', { email, password });
  }

  static async refresh() {
    return api.get<IAuth>(`/auth/refresh`);
  }
}
