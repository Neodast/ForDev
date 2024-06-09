import { Container } from 'inversify';
import { LikeTypes } from '../../utils/types/containers/like.types';
import { LikeService } from '../services/like.service';
import LikeController from '../../api/controllers/like.controller';
import PgLikeRepository from '../../db/dbRepositories/like.repository';
import LikeRepository from '../repositories/like.repository.type';

export const likeContainer = new Container({ defaultScope: 'Singleton' });

likeContainer.bind<LikeService>(LikeTypes.LikeService).to(LikeService);
likeContainer
  .bind<LikeRepository>(LikeTypes.LikeRepository)
  .to(PgLikeRepository);
likeContainer.bind<LikeController>(LikeTypes.LikeController).to(LikeController);
