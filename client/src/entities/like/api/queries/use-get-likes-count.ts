import { likeService } from '@/shared/api/services/like.service';
import { EntityType } from '@/shared/models/types/entity-type.type';
import { useQuery } from '@tanstack/react-query';

export const useGetLikesCount = (id: number, entityType: EntityType) => {
  return useQuery({
    queryKey: [['like', entityType], id],
    queryFn: async () => likeService.getLikesCount(id, entityType),
  });
};
