import { PostCreateDto } from '../../utils/dtos/posts/post-create.dto';
import { PostUpdateDto } from '../../utils/dtos/posts/post-update.dto';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import { DataOptions } from '../../utils/types/data-options';
import PostModel from '../models/post.model';

type PostRepository = {
  getById(id: number): Promise<PostModel>;
  getByAuthor(author: UserSafeDto): Promise<PostModel[]>;
  getAll(options: DataOptions): Promise<PostModel[]>;
  createPost(postData: PostCreateDto): Promise<PostModel>;
  updatePost(id: number, newPostData: PostUpdateDto): Promise<PostModel>;
  deletePost(post: PostModel): Promise<void>;
};

export default PostRepository;
