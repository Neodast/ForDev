export type PostCreateInputDto = {
  title: string;
  text: string;
  image: Express.Multer.File;
  authorId: string;
  sectionTitle: string;
}