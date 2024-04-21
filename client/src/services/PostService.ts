import api from '../http';
import IPost from '@/types/models/IPost';
import IPostUpdate from '@/types/board/IPostUpdate';

export default class PostService {
  static async getAllPosts(): Promise<IPost[]> {
    const { data } = await api.get<IPost[]>('/board/posts');
    return data;
  }

  static async editPost(postData: IPostUpdate): Promise<IPost> {
    const {data} = await api.put<IPost>("/board/updatePost", {...postData});
    return data;
  }
}
