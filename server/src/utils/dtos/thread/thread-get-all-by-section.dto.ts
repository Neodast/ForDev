import { ThreadGetAllDto } from './thread-get-all.dto';

export type ThreadGetAllBySectionDto = ThreadGetAllDto & {
  sectionTitle: string;
}