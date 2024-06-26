import api from '../http';
import { AxiosResponse } from 'axios';
import User from '../types/models/User';
import LoginInput from '../types/user/LoginInput';
import RegisterInput from '../types/user/RegisterInput';
import LoginOutput from '@/types/user/LoginOutput';

type Auth = {
  accessToken: string;
  user: User;
};

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
  ): Promise<AxiosResponse<Auth>> => {
    return await api.post<Auth>('/user/auth/register', { ...registerData });
  };

  static refresh = async (): Promise<LoginOutput> => {
    const { data } = await api.get<LoginOutput>(`/user/auth/refresh`);
    return data;
  };
}

export default AuthService;
