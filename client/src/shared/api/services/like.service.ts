import { LikesGetCountDto } from '../../models/dtos/likes-get-count.dto';
import { api } from '@/shared/api';
import { Like } from '@/shared/models/entities/like.entity';
import { EntityType } from '../../models/types/entity-type.type';

export const likeService = {
  getLikesCount: async (
    id: number,
    entityType: EntityType,
  ): Promise<number> => {
    const { data } = await api.get<LikesGetCountDto>('like/count', {
      params: { id, entityType },
    });
    return data.likesCount;
  },

  like: async (likeData: Like): Promise<Like> => {
    const { data } = await api.post<Like>('like/add', likeData);
    return data;
  },
};
