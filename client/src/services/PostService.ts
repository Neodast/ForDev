import api from '../http';
import Post from '@/types/models/Post';
import PostUpdate from '@/types/board/posts/PostUpdate';
import PostCreate from '@/types/board/posts/PostCreate';
import PostDelete from '@/types/board/posts/PostDelete';

class PostService {
  static getAllPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/board/posts');
    return data;
  };

  static editPost = async (postData: PostUpdate) => {
    const { data } = await api.put<Post>('/board/updatePost', { ...postData });
    return data;
  };

  static createPost = async (postData: PostCreate): Promise<Post> => {
    const { data } = await api.post<Post>('/board/newPost', { ...postData });
    return data;
  };

  static deletePost = async (postData: PostDelete) => {
    return await api.delete<Post>('/board/deletePost', {
      data: { ...postData },
    });
  };
}

export default PostService;
