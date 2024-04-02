import api from '../http';
import { AxiosResponse } from 'axios';
import IUser from '../models/IUser';
import ILoginInput from '../types/user/ILoginInput';

interface IAuth extends ITokenDto, IUser {}

interface ITokenDto {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  static async login(loginData: ILoginInput): Promise<AxiosResponse<IAuth>> {
    return await api.post<IAuth>('/auth/login', { ...loginData });
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
export default AuthService;
