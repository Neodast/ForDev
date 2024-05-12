import LikedModel from '../../../../core/models/LikedModel';

type LikedAddItemDto = Omit<LikedModel, '_id'>;

export default LikedAddItemDto;
