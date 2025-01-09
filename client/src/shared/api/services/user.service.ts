import { api } from '@shared/api';
import { User } from '@/shared/models/entities/user.entity';

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/auth/users');
    return data;
  },
};
