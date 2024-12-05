import api from '@/shared/api';
import Like from '@/types/models/Like';

class LikeService {
  static getPostLikesCount = async (postId: number): Promise<number> => {
    const { data } = await api.get('/like/getPostLikesCount', {
      params: { postId: postId },
    });
    return data;
  };
  static getThreadLikesCount = async (threadId: number): Promise<number> => {
    const { data } = await api.get('/like/getThreadLikesCount', {
      params: { threadId: threadId },
    });
    console.log(data);
    return data;
  };

  static likePost = async (likeData: Like): Promise<Like> => {
    const { data } = await api.post<Like>('/like/addLikeToPost', likeData);
    return data;
  };
  static likeThread = async (likeData: Like): Promise<Like> => {
    const { data } = await api.post('/like/addLikeToThread', {
      threadId: likeData.postId,
      user: likeData.user,
    });
    return data;
  };
}

export default LikeService;
