import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { pgDataSource } from '../db.config';
import PostModel from '../../core/models/post.model';
import PostRepository from '../../core/repositories/post.repository.type';
import PgPostMapper from '../dbMappers/post.db-mapper';
import UserSafeDto from '../../utils/dtos/users/user-safe.dto';
import ApiError from '../../utils/exceptions/api-error';
import { PostCreateDto } from '../../utils/dtos/post/post-create.dto';
import { injectable } from 'inversify';
import { PostUpdateDto } from '../../utils/dtos/post/post-update.dto';
import { DataOptions } from '../../utils/types/data-options';

@injectable()
class PgPostRepository implements PostRepository {
  private readonly postRepository: Repository<Post>;

  constructor() {
    this.postRepository = pgDataSource.getRepository(Post);
  }

  private async findPost(where: Record<string, unknown>): Promise<Post> {
    const dbPost = await this.postRepository.findOne({
      where: where,
      relations: ['author', 'comments', 'comments.author', 'section', 'likes'],
    });
    if (!dbPost) {
      throw new Error('Post is not found!');
    }
    return dbPost;
  }

  private async findPosts(options: DataOptions): Promise<Post[]> {
    const sortableFields = ['creationDate', 'title', 'author'];
    if (!options.sortBy || !sortableFields.includes(options.sortBy)) {
      options.sortBy = 'creationDate';
    }

    let orderOption: Record<string, string> = {};
    orderOption[options.sortBy] = 'ASC';

    const dbPosts = await this.postRepository.find({
      order: orderOption,
      where: options.where,
      take: options.take,
      skip: options.skip,
      relations: ['author', 'comments', 'comments.author'],
    });
    return dbPosts;
  }

  public async getById(postId: number): Promise<PostModel> {
    return PgPostMapper.mapToPostModel(await this.findPost({ id: postId }));
  }

  public async getByAuthor(author: UserSafeDto): Promise<PostModel[]> {
    return (await this.findPosts({ where: { author: author } })).map((dbPost) =>
      PgPostMapper.mapToPostModel(dbPost),
    );
  }

  public async getAll(options: DataOptions): Promise<PostModel[]> {
    return (await this.findPosts(options)).map((dbPost) =>
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

  public async updatePost(postUpdateData: PostUpdateDto) {
    await this.postRepository.update(
      postUpdateData.id,
      {
        title: postUpdateData.title,
        text: postUpdateData.text,
        imageLink: postUpdateData.imageLink,
      },
    );

    const dbPost = await this.findPost({id: postUpdateData.id});

    return PgPostMapper.mapToPostModel(dbPost);
  }

  public async deletePost(post: PostModel): Promise<void> {
    const dbPost = await this.findPost({ id: post.id });
    await this.postRepository.remove(dbPost);
  }
}

export default PgPostRepository;
