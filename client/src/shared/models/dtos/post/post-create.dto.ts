import { Comment } from '@/shared/models/entities';

export type PostCreateDto = {
  title: string;
  text: string;
  authorId: string;
  image: FileList;
  comments: Comment[] | [];
  sectionTitle: string;
};
