import api from '../http';
import { AxiosResponse } from 'axios';
import IUser from '../types/models/IUser';
import ILoginInput from '../types/user/ILoginInput';
import IRegisterInput from '../types/user/IRegisterInput';
import ILoginOutput from '../types/user/ILoginOutput';

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

  static async registration(
    registerData: IRegisterInput,
  ): Promise<AxiosResponse<IAuth>> {
    return api.post<IAuth>('/auth/registration', { ...registerData });
  }

  static async refresh() {
    return api.get<ILoginOutput>(`/auth/refresh`);
  }
}
export default AuthService;
