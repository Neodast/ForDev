import { MongoRepository } from 'typeorm';
import LikedRepository from '../../../core/repositories/LikedRepository';
import { mongoDataSource } from '../../appDataSourse';
import LikedModel from '../../../core/models/LikedModel';
import MongoLikedMapper from '../../dbMappers/mongoDB/MongoLikedMapper';
import LikedItem from '../../entities/mongoDB/LikedEntity';
import LikedAddItemDto from '../../../utils/dtos/likes/LikedAddItem.dto';

class MongoLikedRepository implements LikedRepository {
  private readonly likedRepository: MongoRepository<LikedItem>;

  constructor() {
    this.likedRepository = mongoDataSource.getMongoRepository(LikedItem);
  }

  public async getAll(authorId: string): Promise<LikedModel[]> {
    const likedItem = await this.likedRepository.findBy(authorId);
    return likedItem.map((likedElement) =>
      MongoLikedMapper.mapToLikedModel(likedElement),
    );
  }
  public async saveLikedItem(likedItem: LikedAddItemDto): Promise<LikedModel> {
    const item = await this.likedRepository.save(likedItem);
    return MongoLikedMapper.mapToLikedModel(item);
  }
}

export default new MongoLikedRepository();
