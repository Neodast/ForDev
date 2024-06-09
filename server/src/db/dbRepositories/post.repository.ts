import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { pgDataSource } from '../db.config';
import PostModel from '../../core/models/post.model';
import PostRepository from '../../core/repositories/post.repository.type';
import PgPostMapper from '../dbMappers/post.db-mapper';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import ApiError from '../../utils/exceptions/api-error';
import { PostCreateDto } from '../../utils/dtos/posts/post-create.dto';
import { injectable } from 'inversify';
import { PostUpdateDto } from '../../utils/dtos/posts/post-update.dto';
import { DataOptions } from '../../utils/types/data-options';

@injectable()
class PgPostRepository implements PostRepository {
  private readonly postRepository: Repository<Post>;

  constructor() {
    this.postRepository = pgDataSource.getRepository(Post);
  }

  private async findPost(options: DataOptions): Promise<Post> {
    const dbPost = await this.postRepository.findOne({
      where: options.criteria,
      relations: ['author', 'comments', 'comments.author', 'section'],
    });
    if (!dbPost) {
      throw new Error('Post is not found!');
    }
    return dbPost;
  }

  private async findPosts(options: DataOptions): Promise<Post[]> {
    const dbPosts = await this.postRepository.find({
      order: options.where || { creationDate: 'DESC' },
      where: options.criteria,
      take: options.take,
      skip: options.skip,
      relations: ['author', 'comments', 'comments.author'],
    });
    return dbPosts;
  }

  public async getById(id: number): Promise<PostModel> {
    return PgPostMapper.mapToPostModel(
      await this.findPost({ criteria: { id: id } }),
    );
  }

  public async getByAuthor(author: UserSafeDto): Promise<PostModel[]> {
    return (await this.findPosts({ criteria: { author: author } })).map(
      (dbPost) => PgPostMapper.mapToPostModel(dbPost),
    );
  }

  public async getAll(options: DataOptions): Promise<PostModel[]> {
    return (
      await this.findPosts({
        where: options.where,
        criteria: options.criteria,
        skip: options.skip,
        take: options.take,
      })
    ).map((dbPost) => PgPostMapper.mapToPostModel(dbPost));
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

  public async updatePost(id: number, newPostData: PostUpdateDto) {
    await this.postRepository.update(id, {
      title: newPostData.title,
      text: newPostData.text,
      imageLink: newPostData.imageLink,
    });
    const dbPost = await this.getById(id);
    return PgPostMapper.mapToPostModel(dbPost);
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.findPost({ criteria: { id: post.id } });
    await this.postRepository.remove(dbPost);
  }
}

export default PgPostRepository;
