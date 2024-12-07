import api from '@/app/api';
import CommentPostInput from '@/types/comment/CommentPostInput';
import { CommentUpdate } from '@/types/comment/CommentUpdate';
import Comment from '@/types/models/Comment';

class CommentService {
  static addPostComment = async (
    commentData: CommentPostInput,
  ): Promise<Comment> => {
    console.log(commentData);
    const { data } = await api.post<Comment>('/comment/addToPost', {
      ...commentData,
    });
    return data;
  };

  static getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
    const { data } = await api.get('/comment/getByPostId', {
      params: { postId: postId },
    });
    return data;
  };

  static editComment = async (
    commentUpdateData: CommentUpdate,
  ): Promise<Comment> => {
    const { data } = await api.put<Comment>(
      '/comment/update',
      commentUpdateData,
    );
    return data;
  };

  static deleteComment = async (id: number): Promise<void> => {
    return await api.delete('/comment/delete', {
      data: { commentId: id },
    });
  };
}

export default CommentService;
