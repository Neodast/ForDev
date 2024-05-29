import MongoLikedRepository from '../../db/dbRepositories/mongoDB/MongoLikedRepository';
import LikedAddItemDto from '../../utils/dtos/likes/liked-item-create.dto';
import LikedModel from '../models/liked.model';
import LikedRepository from '../repositories/liked.repository.type';

class LikedService {
  constructor(readonly likedRepository: LikedRepository) {}

  public async getAll(authorId: string): Promise<LikedModel[]> {
    return this.likedRepository.getAll(authorId);
  }

  public async like(likedItem: LikedAddItemDto): Promise<LikedModel> {
    return this.likedRepository.saveLikedItem(likedItem);
  }
}

export default new LikedService(MongoLikedRepository);
