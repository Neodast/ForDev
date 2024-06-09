import { Container } from 'inversify';
import { PostTypes } from '../../utils/types/containers/post.types';
import { PostService } from '../services/post.service';
import PostController from '../../api/controllers/post.controller';
import PgPostRepository from '../../db/dbRepositories/post.repository';
import PostRepository from '../repositories/post.repository.type';

export const postContainer = new Container({ defaultScope: 'Singleton' });

postContainer.bind<PostService>(PostTypes.PostService).to(PostService);
postContainer
  .bind<PostRepository>(PostTypes.PostRepository)
  .to(PgPostRepository);
postContainer.bind<PostController>(PostTypes.PostController).to(PostController);
