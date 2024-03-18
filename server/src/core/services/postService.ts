import pgPostRepository from '../../db/dbRepositories/postgreSQL/pgPostRepository';
import PostModel from '../models/postModel';
import IPostRepository from '../repositories/IPostRepository';

class PostService {
  constructor(
    readonly postRepository: IPostRepository,
  ) {}

  async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }
}

export default new PostService(pgPostRepository);