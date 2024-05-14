import api from '@/http'

class LikeService {
  static getPostLikesCount = async (postId: number) : Promise<number> => {
    const {data} = await api.get('/like/postLikesCount', {params: {postId: postId}});
    return data;
  }
}

export default LikeService;