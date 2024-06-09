import { PostGetAllDto } from './post-get-all.dto';

export type PostGetAllByAuthorDto = PostGetAllDto & {
  authorId: string;
}