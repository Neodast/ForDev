import UserSafeDto from '../../utils/dtos/users/userSafe.dto';
import PostModel from '../models/postModel';

interface IPostRepository {
  getById(id: number): Promise<PostModel>;
  getByAuthor(author: UserSafeDto): Promise<PostModel[]>;
  getAll(): Promise<PostModel[]>;
  createPost(postData: PostModel): Promise<PostModel>;
  updatePost(id: number, newPostData: PostModel): Promise<PostModel>;
  deletePost(post: PostModel): Promise<void>;
}

export default IPostRepository;
