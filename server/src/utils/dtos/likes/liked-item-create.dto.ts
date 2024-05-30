import LikedModel from '../../../core/models/liked.model';

type LikedAddItemDto = Omit<LikedModel, '_id'>;

export default LikedAddItemDto;
