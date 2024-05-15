import LikedAddItemDto from '../../utils/dtos/likes/LikedAddItem.dto';
import LikedModel from '../models/LikedModel';

type LikedRepository = {
  // getAllByType(authorId: string, type: LikedItemType): Promise<LikedModel[]>;
  // getByType(authorId: string, type: LikedItemType): Promise<LikedModel>;
  getAll(authorId: string): Promise<LikedModel[]>;
  // getOne(authorId: string): Promise<LikedModel>;
  saveLikedItem(likedItem: LikedAddItemDto): Promise<LikedModel>;
  // deleteLikedItem(likedItemId: number): Promise<void>;
};

export default LikedRepository;
