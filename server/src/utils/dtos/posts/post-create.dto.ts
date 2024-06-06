import SectionModel from '../../../core/models/section.model';

export type PostCreateDto = {
  title: string;
  text: string;
  imageLink: string;
  authorId: string;
  section: SectionModel;
}