import IUser from '@/types/models/IUser';

interface IPostCreate {
  title: string;
  text: string;
  author: IUser
  // comments: CommentModel[];
  sectionTitle: string;
}

export default IPostCreate;