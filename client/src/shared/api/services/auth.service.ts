import { api } from '@/shared/api';
import { LoginInputDto } from '@/shared/models/dtos/login-input.dto';
import { LoginOutputDto } from '@/shared/models/dtos/login-output.dto';
import { RegistrationInputDto } from '@/shared/models/dtos/registration-input.dto';
import { RegistrationOutputDto } from '@/shared/models/dtos/registration-output.fto';

export const authService = {
  login: async (loginData: LoginInputDto): Promise<LoginOutputDto> => {
    const { data } = await api.post<LoginOutputDto>('/user/auth/login', {
      ...loginData,
    });
    return data;
  },

  logout: async (): Promise<void> => {
    return await api.get(`/user/auth/logout`);
  },

  registration: async (
    registerData: RegistrationInputDto,
  ): Promise<RegistrationOutputDto> => {
    const { data } = await api.post<RegistrationOutputDto>(
      '/user/auth/register',
      {
        ...registerData,
      },
    );
    return data;
  },

  refresh: async (): Promise<LoginOutputDto> => {
    const { data } = await api.get<LoginOutputDto>(`/user/auth/refresh`);
    return data;
  },
};
