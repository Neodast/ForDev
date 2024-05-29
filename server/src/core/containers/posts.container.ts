import { Container } from 'inversify';
import { TYPES } from '../types/posts.types';
import PostService from '../services/PostService';
import PostController from '../../api/controllers/PostController';
import PgPostRepository from '../../db/dbRepositories/postgreSQL/post.repository';
import PostRepository from '../repositories/PostRepository';

const postsContainer = new Container();
postsContainer.bind<PostService>(TYPES.PostService).to(PostService);
postsContainer.bind<PostRepository>(TYPES.PostRepository).to(PgPostRepository);
postsContainer.bind<PostController>(TYPES.PostController).to(PostController);

export { postsContainer };
