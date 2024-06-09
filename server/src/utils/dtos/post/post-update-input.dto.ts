export type PostUpdateInputDto = {
  postId: number;
  title?: string;
  text?: string;
  image?: Express.Multer.File;
}