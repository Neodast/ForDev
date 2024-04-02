import IUser from '../../models/IUser';
import ILoginOutput from './ILoginOutput';

interface IUserStore {
  user: IUser | null;
  isLoading: boolean;
  isAuth: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuth: (isAuthenticated: boolean) => void;
  setCredentials: (credentials: ILoginOutput) => void;
  removeCredentials: () => void;
}

export default IUserStore;
