import LikedItemType from '../../utils/enums/liked-item';

type LikedModel = {
  id: string;
  authorId: string;
  likedItemId: number;
  likedItemType: LikedItemType;
};

export default LikedModel;
