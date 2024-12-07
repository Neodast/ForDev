import api from '../app/api';
import { AxiosResponse } from 'axios';
import LoginInput from '../types/user/LoginInput';
import RegisterInput from '../types/user/RegisterInput';
import LoginOutput from '@/types/user/LoginOutput';
import { AuthResponse } from '@/types/auth/AuthResponse';

class AuthService {
  static login = async (loginData: LoginInput): Promise<LoginOutput> => {
    const { data } = await api.post<LoginOutput>('/user/auth/login', {
      ...loginData,
    });
    return data;
  };

  static logout = async (): Promise<void> => {
    return await api.get(`/user/auth/logout`);
  };

  static registration = async (
    registerData: RegisterInput,
  ): Promise<AxiosResponse<AuthResponse>> => {
    return await api.post<AuthResponse>('/user/auth/register', {
      ...registerData,
    });
  };

  static refresh = async (): Promise<LoginOutput> => {
    const { data } = await api.get<LoginOutput>(`/user/auth/refresh`);
    return data;
  };
}

export default AuthService;
