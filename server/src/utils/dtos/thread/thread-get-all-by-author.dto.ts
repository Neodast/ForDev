import { ThreadGetAllDto } from './thread-get-all.dto';

export type ThreadGetAllByAuthorDto = ThreadGetAllDto & {
  authorId: string;
}