import Comment from '../../models/Comment';

type ThreadCreate = {
  title: string;
  text: string;
  authorId: string;
  comments: Comment[] | [];
  sectionTitle: string;
};

export default ThreadCreate;
