import { EntityType } from '@/shared/models/types/entity-type.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeService } from '@shared/api/services/like.service';

export const useLike = (id: number, entityType: EntityType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeService.like,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [['like', entityType], id],
      });
    },
  });
};
