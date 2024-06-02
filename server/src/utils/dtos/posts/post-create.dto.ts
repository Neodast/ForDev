import SectionModel from '../../../core/models/section.model';

interface PostCreateDto {
  title: string;
  text: string;
  imageLink: string;
  authorId: string;
  section: SectionModel;
}

export default PostCreateDto;
