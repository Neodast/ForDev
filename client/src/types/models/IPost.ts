import IUser from './IUser';

interface IPost {
  id: number;
  title: string;
  likes: number;
  text: string;
  author: IUser;
  // comments: CommentModel[];
  // section: Section;
}

export default IPost;