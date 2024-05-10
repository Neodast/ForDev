import User from '@/types/models/User';
import Comment from '../../models/Comment';

interface IPostCreate {
  title: string;
  text: string;
  author: User;
  comments: Comment[] | [];
  sectionTitle: string;
}

export default IPostCreate;
