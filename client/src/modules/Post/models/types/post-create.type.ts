import { Comment } from '@/shared/utils/types/models/comment.type';

export type PostCreate = {
  title: string;
  text: string;
  authorId: string;
  image: FileList;
  comments: Comment[] | [];
  sectionTitle: string;
};
