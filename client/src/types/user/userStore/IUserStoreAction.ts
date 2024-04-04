import IUser from '../../models/IUser';
import ILoginOutput from '../ILoginOutput';

interface IUserStoreAction {
  setUser: (user: IUser | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuth: (isAuthenticated: boolean) => void;
  setCredentials: (credentials: ILoginOutput) => void;
  removeCredentials: () => void;
}

export default IUserStoreAction;
