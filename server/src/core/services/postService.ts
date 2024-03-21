import pgPostRepository from '../../db/dbRepositories/postgreSQL/pgPostRepository';
import PostModel from '../models/postModel';
import IPostRepository from '../repositories/IPostRepository';
import commentService from './commentService';

class PostService {
  constructor(readonly postRepository: IPostRepository) {}

  public async createPost(postData: PostModel): Promise<PostModel> {
    return pgPostRepository.createPost(postData);
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await pgPostRepository.getById(post.id);
    dbPost.comments.map((comment) => commentService.deleteComment(comment));
    return pgPostRepository.deletePost(dbPost);
  }

  public async getAllPosts(): Promise<PostModel[]> {
    return this.postRepository.getAll();
  }
}

export default new PostService(pgPostRepository);
