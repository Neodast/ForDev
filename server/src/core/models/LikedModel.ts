import LikedItemType from '../../utils/enums/likedItem.enum';

type LikedModel = {
  id: string;
  authorId: string;
  likedItemId: number;
  likedItemType: LikedItemType;
}

export default LikedModel;
