import MongoLikedRepository from '../../db/dbRepositories/mongoDB/MongoLikedRepository';
import LikedAddItemDto from '../../utils/dtos/posts/liked/LikedAddItem.dto';
import LikedModel from '../models/LikedModel';
import ILikedRepository from '../repositories/ILikedRepository';

class LikedService {
  constructor(readonly likedRepository: ILikedRepository) {}

  public async getAll(authorId: string): Promise<LikedModel[]> {
    return this.likedRepository.getAll(authorId);
  }

  public async like(likedItem: LikedAddItemDto): Promise<LikedModel> {
    return this.likedRepository.saveLikedItem(likedItem);
  }
}

export default new LikedService(MongoLikedRepository);
