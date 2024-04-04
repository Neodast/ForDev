import IUser from '../../models/IUser';

interface IUserStoreState {
  user: IUser | null;
  isLoading: boolean;
  isAuth: boolean;
}

export default IUserStoreState;
