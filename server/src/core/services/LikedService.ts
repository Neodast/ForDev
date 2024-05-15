import MongoLikedRepository from '../../db/dbRepositories/mongoDB/MongoLikedRepository';
import LikedAddItemDto from '../../utils/dtos/likes/LikedAddItem.dto';
import LikedModel from '../models/LikedModel';
import LikedRepository from '../repositories/LikedRepository';

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
