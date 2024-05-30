import { inject, injectable } from 'inversify';
import PostCreateDto from '../../utils/dtos/posts/post-create.dto';
import PostInputDto from '../../utils/dtos/posts/post-input.dto';
import PostModel from '../models/post.model';
import PostRepository from '../repositories/post.repository.type';
import { PostTypes } from '../types/post.types';
import { SectionTypes } from '../types/section.types';
import SectionService from './section.service';

@injectable()
class PostService {
  constructor(
    @inject(PostTypes.PostRepository) private postRepository: PostRepository,
    @inject(SectionTypes.SectionService) private sectionService: SectionService,
  ) {}

  public async createPost(postData: PostInputDto): Promise<PostModel> {
    const section = await this.sectionService.getSection(postData.sectionTitle);
    const postCreateData: PostCreateDto = {
      section: section,
      ...postData,
    };
    return this.postRepository.createPost(postCreateData);
  }

  public async updatePost(post: PostModel): Promise<PostModel> {
    return this.postRepository.updatePost(post.id, post);
  }

  public async deletePost(postId: number): Promise<void> {
    const dbPost = await this.postRepository.getById(postId);
    return this.postRepository.deletePost(dbPost);
  }

  public async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }

  public async getPostById(postId: number): Promise<PostModel> {
    return this.postRepository.getById(postId);
  }
}

export default PostService;
