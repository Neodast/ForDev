import UserStoreAction from './UserStoreAction';
import UserStoreState from './UserStoreState';

type UserStore = UserStoreState & UserStoreAction;

export default UserStore;
