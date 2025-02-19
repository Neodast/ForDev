import { api } from '@/shared/api';
import {
  LoginInputDto,
  LoginOutputDto,
  RegistrationInputDto,
  RegistrationOutputDto,
} from '@/shared/models/dtos';

const URL = '/user/auth';

export const authService = {
  login: async (loginData: LoginInputDto): Promise<LoginOutputDto> => {
    const { data } = await api.post<LoginOutputDto>(`${URL}/login`, {
      ...loginData,
    });
    return data;
  },

  logout: async (): Promise<void> => {
    return await api.get(`${URL}/logout`);
  },

  registration: async (
    registerData: RegistrationInputDto,
  ): Promise<RegistrationOutputDto> => {
    const { data } = await api.post<RegistrationOutputDto>(`${URL}/register`, {
      ...registerData,
    });
    return data;
  },

  refresh: async (): Promise<LoginOutputDto> => {
    const { data } = await api.get<LoginOutputDto>(`${URL}/refresh`);
    return data;
  },
};
