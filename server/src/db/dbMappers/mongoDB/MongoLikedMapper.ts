import LikedMapper from '../../../core/mappers/LikedMapper';
import LikedModel from '../../../core/models/LikedModel';
import LikedItemTypes from '../../entities/mongoDB/LikedEntity';

class MongoLikedMapper extends LikedMapper {
  public static mapToLikedModel(liked: LikedItemTypes): LikedModel {
    return {
      id: String(liked._id), //TODO fix this shit. It`s look like KOSTIL
      authorId: liked.authorId,
      likedItemId: liked.likedItemId,
      likedItemType: liked.likedItemType,
    };
  }
}

export default MongoLikedMapper;
