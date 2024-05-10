import api from '../http';
import Post from '@/types/models/Post';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import IPostCreate from '@/types/board/posts/IPostCreate';
import IPostDelete from '@/types/board/posts/IPostDelete';

export default class PostService {
  static getAllPosts = async (): Promise<Post[]> => {
    const { data } = await api.get<Post[]>('/board/posts');
    return data;
  };

  static editPost = async (postData: IPostUpdate) => {
    const { data } = await api.put<Post>('/board/updatePost', { ...postData });
    return data;
  };

  static createPost = async (postData: IPostCreate): Promise<Post> => {
    const { data } = await api.post<Post>('/board/newPost', { ...postData });
    return data;
  };

  static deletePost = async (postData: IPostDelete) => {
    return await api.delete<Post>('/board/deletePost', {
      data: { ...postData },
    });
  };
}
