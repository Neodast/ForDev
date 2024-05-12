import LikedItemType from '../../utils/enums/likedItem.enum';

interface LikedModel {
  id: string;
  authorId: string;
  likedItemId: number;
  likedItemType: LikedItemType;
}

export default LikedModel;
