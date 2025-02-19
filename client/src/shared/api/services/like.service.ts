import { api } from '@/shared/api';
import { LikesGetCountDto } from '@/shared/models/dtos';
import { Like } from '@/shared/models/entities';
import { EntityType } from '@/shared/models/types';

const URL = '/like';

export const likeService = {
  getLikesCount: async (
    id: number,
    entityType: EntityType,
  ): Promise<number> => {
    const { data } = await api.get<LikesGetCountDto>(`${URL}/count`, {
      params: { id, entityType },
    });
    return data.likesCount;
  },

  like: async (likeData: Like): Promise<Like> => {
    const { data } = await api.post<Like>(`${URL}/add`, likeData);
    return data;
  },
};
