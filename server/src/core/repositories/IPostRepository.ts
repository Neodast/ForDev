import PostCreateDto from '../../utils/dtos/posts/PostCreate.dto';
import UserSafeDto from '../../utils/dtos/users/UserSafe.dto';
import PostModel from '../models/PostModel';

interface IPostRepository {
  getById(id: number): Promise<PostModel>;
  getByAuthor(author: UserSafeDto): Promise<PostModel[]>;
  getAll(): Promise<PostModel[]>;
  createPost(postData: PostCreateDto): Promise<PostModel>;
  updatePost(id: number, newPostData: PostModel): Promise<PostModel>;
  deletePost(post: PostModel): Promise<void>;
}

export default IPostRepository;
