import { Comment } from '@/shared/models/entities';

export type ThreadCreate = {
  title: string;
  text: string;
  authorId: string;
  comments: Comment[] | [];
  sectionTitle: string;
};
