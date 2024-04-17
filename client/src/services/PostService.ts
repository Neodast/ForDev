import { AxiosResponse } from 'axios';
import api from '../http';
import IPost from '@/types/models/IPost';
import IPostUpdate from '@/types/board/IPostUpdate';

export default class PostService {
  static getAllPosts(): Promise<AxiosResponse<IPost[]>> {
    return api.get<IPost[]>('/board/posts');
  }

  static editPost(postData: IPostUpdate): Promise<AxiosResponse<IPost>> {
    return api.put<IPost>("/board/updatePost", {...postData});
  }
}
