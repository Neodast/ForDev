import IUser from '@/types/models/IUser';
import IComment from '../IComment';

interface IPostCreate {
  title: string;
  text: string;
  author: IUser
  comments: IComment[] | [];
  sectionTitle: string;
}

export default IPostCreate;