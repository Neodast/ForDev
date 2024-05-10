import { Repository } from 'typeorm';
import { Post } from '../../entities/PostEntity';
import appDataSource from '../../appDataSourse';
import PostModel from '../../../core/models/PostModel';
import IPostRepository from '../../../core/repositories/IPostRepository';
import PgPostMapper from '../../dbMappers/postgreSQL/PgPostMapper';
import UserSafeDto from '../../../utils/dtos/users/UserSafe.dto';
import ApiError from '../../../utils/exceptions/ApiError';
import PostCreateDto from '../../../utils/dtos/posts/PostCreate.dto';

class PgPostRepository implements IPostRepository {
  private readonly postRepository: Repository<Post>;

  constructor() {
    this.postRepository = appDataSource.getRepository(Post);
  }

  private async findPost(criteria: Record<string, unknown>): Promise<Post> {
    const dbPost = await this.postRepository.findOne({
      where: criteria,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbPost) {
      throw new Error('Post is not found!');
    }
    return dbPost;
  }

  private async findPosts(criteria?: Record<string, unknown>): Promise<Post[]> {
    const dbPosts = await this.postRepository.find({
      where: criteria,
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!dbPosts.length) {
      throw new Error('Posts are not found!');
    }
    return dbPosts;
  }

  public async getById(id: number): Promise<PostModel> {
    return PgPostMapper.mapToPostModel(await this.findPost({ id }));
  }

  public async getByAuthor(author: UserSafeDto): Promise<PostModel[]> {
    return (await this.findPosts({ author })).map((dbPost) =>
      PgPostMapper.mapToPostModel(dbPost),
    );
  }

  public async getAll(): Promise<PostModel[]> {
    return (await this.findPosts()).map((dbPost) =>
      PgPostMapper.mapToPostModel(dbPost),
    );
  }

  public async createPost(postData: PostCreateDto): Promise<PostModel> {
    if (!postData) {
      throw ApiError.BadRequest('Post is undefined!');
    }
    Object.assign(postData, { likes: 0 });
    const post = this.postRepository.create(postData);
    return PgPostMapper.mapToPostModel(await this.postRepository.save(post));
  }

  public async updatePost(
    id: number,
    newPostData: PostModel,
  ): Promise<PostModel> {
    const dbPost = await this.getById(id);
    Object.assign(dbPost, {...newPostData});
    return PgPostMapper.mapToPostModel(await this.postRepository.save(dbPost));
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.findPost({ ...post });
    await this.postRepository.remove(dbPost);
  }
}

export default new PgPostRepository();
