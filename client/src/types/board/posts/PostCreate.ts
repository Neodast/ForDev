import Comment from '../../models/Comment';

type PostCreate = {
  title: string;
  text: string;
  authorId: string;
  image: FileList;
  comments: Comment[] | [];
  sectionTitle: string;
};

export default PostCreate;
