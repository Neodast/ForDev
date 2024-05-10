import User from '../../models/User';
import LoginOutput from '../LoginOutput';

type UserStoreAction = {
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsAuth: (isAuth: boolean) => void;
  login: (credentials: LoginOutput) => void;
  logout: () => void;
};

export default UserStoreAction;
