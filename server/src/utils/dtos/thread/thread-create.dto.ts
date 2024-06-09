import SectionModel from '../../../core/models/section.model';

export type ThreadCreateDto = {
  title: string;
  text: string;
  authorId: string;
  section: SectionModel;
}