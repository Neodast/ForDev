import PostCreateDto from '../../utils/dtos/posts/post-create.dto';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import PostModel from '../models/post.model';

type PostRepository = {
  getById(id: number): Promise<PostModel>;
  getByAuthor(author: UserSafeDto): Promise<PostModel[]>;
  getAll(): Promise<PostModel[]>;
  createPost(postData: PostCreateDto): Promise<PostModel>;
  updatePost(id: number, newPostData: PostModel): Promise<PostModel>;
  deletePost(post: PostModel): Promise<void>;
};

export default PostRepository;
