import api from '@/http'
import Like from '@/types/models/Like';

class LikeService {
  static getPostLikesCount = async (postId: number) : Promise<number> => {
    const {data} = await api.get('/like/getPostLikesCount', {params: {postId: postId}});
    return data;
  }

  static likePost = async(likeData: Like) : Promise<Like> => {
    const {data} = await api.post<Like>('/like/likePost', {...likeData});
    return data;
  }
}

export default LikeService;