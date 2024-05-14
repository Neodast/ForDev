import LikeModel from '../../../../core/models/LikeModel';

type LikeAddDto = Omit<LikeModel, 'id'>;

export default LikeAddDto;
