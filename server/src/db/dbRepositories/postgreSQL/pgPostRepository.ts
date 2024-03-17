import { Repository } from 'typeorm';
import { Post } from '../../entities/postEntity';
import appDataSource from '../../appDataSourse';
import PostModel from '../../../core/models/postModel';
import IPostRepository from '../../../core/repositories/IPostRepository';
import PgPostMapper from '../../dbMappers/postgreSQL/pgPostMapper';
import UserSafeDto from '../../../utils/dtos/userDtos/userSafe.dto';
import ApiError from '../../../utils/exeptions/apiError';

class PgPostRepository implements IPostRepository {
  private readonly postRepository: Repository<Post>;

  constructor() {
    this.postRepository = appDataSource.getRepository(Post);
  }

  private async findPost(
    criteria: Record<string, unknown>,
  ): Promise<PostModel> {
    const dbPost = await this.postRepository.findOneBy(criteria);
    if (!dbPost) {
      throw new Error('Post is not found!');
    }
    const post: PostModel = PgPostMapper.mapToPostModel(dbPost);
    return post;
  }

  private async findPosts(
    criteria?: Record<string, unknown>,
  ): Promise<PostModel[]> {
    const dbPosts = await this.postRepository.find(criteria);
    if (!dbPosts.length) {
      throw new Error('Posts are not found!');
    }
    const posts = dbPosts.map((dbPost) => PgPostMapper.mapToPostModel(dbPost));
    return posts;
  }

  public async getById(id: number): Promise<PostModel> {
    return this.findPost({ id });
  }

  public async getByAuthor(author: UserSafeDto): Promise<PostModel[]> {
    return this.findPosts({ author });
  }

  public async getAll(): Promise<PostModel[]> {
    return this.findPosts();
  }

  public async createPost(postData: PostModel): Promise<PostModel> {
    if (!postData) {
      throw ApiError.BadRequest('Post is undefined!');
    }
    const post = this.postRepository.create(postData);
    return PgPostMapper.mapToPostModel(await this.postRepository.save(post));
  }

  public async updatePost(
    id: number,
    newPostData: PostModel,
  ): Promise<PostModel> {
    const post = await this.getById(id);
    Object.assign(post, newPostData);
    return PgPostMapper.mapToPostModel(await this.postRepository.save(post));
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.getById(post.id);
    await this.postRepository.delete(dbPost);
  }
}

export default new PgPostRepository();
