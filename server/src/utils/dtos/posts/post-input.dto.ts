interface PostInputDto {
  title: string;
  text: string;
  image: Express.Multer.File;
  authorId: string;
  sectionTitle: string;
}

export default PostInputDto;
