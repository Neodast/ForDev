import { PostGetAllDto } from './post-get-all.dto';

export type PostGetAllBySectionDto = PostGetAllDto & {
  sectionTitle: string;
}