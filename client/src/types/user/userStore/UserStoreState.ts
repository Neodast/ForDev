import User from '../../models/User';

type UserStoreState = {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
};

export default UserStoreState;
