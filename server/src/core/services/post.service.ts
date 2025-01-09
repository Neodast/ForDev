import { inject, injectable } from 'inversify';
import { PostCreateDto } from '../../utils/dtos/post/post-create.dto';
import PostModel from '../models/post.model';
import PostRepository from '../repositories/post.repository.type';
import { PostTypes } from '../../utils/types/containers/post.types';
import { SectionTypes } from '../../utils/types/containers/section.types';
import { SectionService } from './section.service';
import { PostUpdateDto } from '../../utils/dtos/post/post-update.dto';
import { DataOptions } from '../../utils/types/data-options..typets';

@injectable()
export class PostService {
  constructor(
    @inject(PostTypes.PostRepository) private postRepository: PostRepository,
  ) {}

  public async createPost(postData: PostCreateDto): Promise<PostModel> {
    return this.postRepository.createPost(postData);
  }

  public async updatePost(post: PostUpdateDto): Promise<PostModel> {
    return this.postRepository.updatePost(post);
  }

  public async deletePost(postId: number): Promise<void> {
    const dbPost = await this.postRepository.getById(postId);
    return this.postRepository.deletePost(dbPost);
  }

  public async getPosts(options: DataOptions): Promise<PostModel[]> {
    return this.postRepository.getAll(options);
  }

  public async getPostById(postId: number): Promise<PostModel> {
    return this.postRepository.getById(postId);
  }
}
