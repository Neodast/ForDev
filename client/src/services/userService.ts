import { AxiosResponse } from 'axios';
import IUser from '../types/models/IUser';
import api from '../http';

export default class UserService {
  static getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>('/auth/users');
  }
}
