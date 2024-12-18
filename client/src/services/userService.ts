import { AxiosResponse } from 'axios';
import User from '../types/models/User';
import api from '../app/api';

export default class UserService {
  static getAllUsers = async (): Promise<AxiosResponse<User[]>> => {
    return await api.get<User[]>('/auth/users');
  };
}
