import api from '../http';
import IPost from '@/types/models/IPost';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import IPostCreate from '@/types/board/posts/IPostCreate';
import IPostDelete from '@/types/board/posts/IPostDelete';

export default class PostService {
  static async getAllPosts(): Promise<IPost[]> {
    const { data } = await api.get<IPost[]>('/board/posts');
    return data;
  }

  static async editPost(postData: IPostUpdate): Promise<IPost> {
    const { data } = await api.put<IPost>('/board/updatePost', { ...postData });
    return data;
  }

  static async createPost(postData: IPostCreate): Promise<IPost> {
    const { data } = await api.post<IPost>('/board/newPost', { ...postData });
    return data;
  }

  static async deletePost(postData: IPostDelete) {
    await api.delete<IPost>('/board/deltePost', { data: postData });
  }
}
