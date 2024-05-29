import { Container } from 'inversify';
import { TYPES } from '../types/posts.types';
import PostService from '../services/posts.service';
import PostController from '../../api/controllers/post.controller';
import PgPostRepository from '../../db/dbRepositories/post.repository';
import PostRepository from '../repositories/post.repository.type';

const postsContainer = new Container();
postsContainer.bind<PostService>(TYPES.PostService).to(PostService);
postsContainer.bind<PostRepository>(TYPES.PostRepository).to(PgPostRepository);
postsContainer.bind<PostController>(TYPES.PostController).to(PostController);

export { postsContainer };
