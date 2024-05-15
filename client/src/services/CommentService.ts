import api from '@/http';
import CommentPostInput from '@/types/comment/CommentPostInput';
import Comment from '@/types/models/Comment';

class CommentService {
  static addPostComment = async (commentData: CommentPostInput): Promise<Comment> => {
    const {data} = await api.post<CommentPostInput>('/comment/addToPost', {...commentData});
    return data;
  }

  static getCommentsByPostId = async (postId: number) : Promise<Comment[]> => {
    const {data} = await api.get('/comment/getByPostId', {params: {postId: postId}});
    return data;
  }
}

export default CommentService;