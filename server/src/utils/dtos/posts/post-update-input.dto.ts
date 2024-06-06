export type PostUpdateInputDto = {
  id: number;
  title?: string;
  text?: string;
  image?: Express.Multer.File;
}