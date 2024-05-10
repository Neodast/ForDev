import pgPostRepository from '../../db/dbRepositories/postgreSQL/PgPostRepository';
import PostCreateDto from '../../utils/dtos/posts/PostCreate.dto';
import PostInputDto from '../../utils/dtos/posts/PostInput.dto';
import PostModel from '../models/PostModel';
import IPostRepository from '../repositories/IPostRepository';
import sectionService from './SectionService';

class PostService {
  constructor(readonly postRepository: IPostRepository) {}

  public async createPost(postData: PostInputDto): Promise<PostModel> {
    const section = await sectionService.getSection(postData.sectionTitle);
    const postCreateData: PostCreateDto = {
      section: section,
      likes: 0,
      ...postData,
    };
    return this.postRepository.createPost(postCreateData);
  }

  public async updatePost(post: PostModel): Promise<PostModel> {
    return this.postRepository.updatePost(post.id, post);
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.postRepository.getById(post.id);
    return this.postRepository.deletePost(dbPost);
  }

  public async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }
}

export default new PostService(pgPostRepository);
