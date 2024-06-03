import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { pgDataSource } from '../db.config';
import PostModel from '../../core/models/post.model';
import PostRepository from '../../core/repositories/post.repository.type';
import PgPostMapper from '../dbMappers/post.db-mapper';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import ApiError from '../../utils/exceptions/api-error';
import PostCreateDto from '../../utils/dtos/posts/post-create.dto';
import { injectable } from 'inversify';

@injectable()
class PgPostRepository implements PostRepository {
  private readonly postRepository: Repository<Post>;

  constructor() {
    this.postRepository = pgDataSource.getRepository(Post);
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

    const post = this.postRepository.create({
      author: { id: postData.authorId },
      ...postData,
    });

    await this.postRepository.insert(post);

    const dbPost = await this.getById(post.id);

    return dbPost;
  }

  public async updatePost(
    id: number,
    newPostData: PostModel,
  ): Promise<PostModel> {
    const dbPost = await this.getById(id);
    Object.assign(dbPost, { ...newPostData });
    return PgPostMapper.mapToPostModel(await this.postRepository.save(dbPost));
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.findPost({ id: post.id });
    await this.postRepository.remove(dbPost);
  }
}

export default PgPostRepository;
