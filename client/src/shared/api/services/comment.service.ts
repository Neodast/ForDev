import { api } from '@/shared/api';
import { Comment } from '@/shared/models/entities';
import { CommentInputDto, CommentUpdateDto } from '@/shared/models/dtos';
import { EntityType } from '@/shared/models/types';

const URL = '/comments';

export const commentService = {
  create: async (commentData: CommentInputDto): Promise<Comment> => {
    const { data } = await api.post<Comment>(`${URL}/create`, {
      ...commentData,
    });
    return data;
  },

  get: async (id: number, entityType: EntityType): Promise<Comment[]> => {
    const { data } = await api.get<Comment[]>(`${URL}/get`, {
      params: { id, entityType },
    });
    return data;
  },

  getCount: async (id: number, entityType: EntityType): Promise<number> => {
    const { data } = await api.get<{ commentsCount: number }>(
      `${URL}/getCount`,
      {
        params: { id, entityType },
      },
    );
    return data.commentsCount;
  },

  update: async (commentUpdateData: CommentUpdateDto): Promise<Comment> => {
    const { data } = await api.put<Comment>(`${URL}/update`, commentUpdateData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    return await api.delete(`${URL}/delete`, {
      data: { commentId: id },
    });
  },
};
