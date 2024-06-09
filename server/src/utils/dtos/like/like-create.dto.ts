import LikeModel from '../../../core/models/like.model';

type LikeCreateDto = Omit<LikeModel, 'id'>;

export default LikeCreateDto;
