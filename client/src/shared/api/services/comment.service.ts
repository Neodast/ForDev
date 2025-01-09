import { api } from '@/shared/api';
import { Comment } from '@/shared/models/entities/comment.entity';
import { CommentInputDto } from '@/shared/models/dtos/comment-input.dto';
import { CommentUpdateDto } from '@/shared/models/dtos/comment-update.dto';
import { EntityType } from '@/shared/models/types/entity-type.type';

const url = '/comments';

export const commentService = {
  create: async (commentData: CommentInputDto): Promise<Comment> => {
    const { data } = await api.post<Comment>(`${url}/create`, {
      ...commentData,
    });
    return data;
  },

  get: async (id: number, entityType: EntityType): Promise<Comment[]> => {
    const { data } = await api.get<Comment[]>(`${url}/get`, {
      params: { id, entityType },
    });
    return data;
  },

  getCount: async (id: number, entityType: EntityType): Promise<number> => {
    const { data } = await api.get<{ commentsCount: number }>(
      `${url}/getCount`,
      {
        params: { id, entityType },
      },
    );
    return data.commentsCount;
  },

  update: async (commentUpdateData: CommentUpdateDto): Promise<Comment> => {
    const { data } = await api.put<Comment>(`${url}/update`, commentUpdateData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    return await api.delete(`${url}/delete`, {
      data: { commentId: id },
    });
  },
};
