import IUser from '../models/IUser';

interface IComment {
  text: string;
  author: IUser;
}

export default IComment;