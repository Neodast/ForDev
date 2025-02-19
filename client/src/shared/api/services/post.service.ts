import { api } from '@/shared/api';
import {
  PostCreateDto,
  PostDeleteDto,
  PostUpdateDto,
} from '@/shared/models/dtos';
import { Post } from '@/shared/models/entities';

const URL = '/post';

export const postService = {
  getPosts: async (page: number, take: number): Promise<Post[]> => {
    if (page > 1) {
      page += take;
    }
    const { data } = await api.get<Post[]>(`${URL}/all`, {
      params: {
        skip: page - 1,
        take: take,
      },
    });
    return data;
  },

  getPostById: async (postId: number): Promise<Post> => {
    const { data } = await api.get(`${URL}`, { params: { postId: postId } });
    return data;
  },

  editPost: async (postData: PostUpdateDto) => {
    const formData = new FormData();

    formData.append('id', postData.id.toString());
    formData.append('text', postData.text);
    formData.append('title', postData.title);
    formData.append('image', postData.image![0]);

    const { data } = await api.put<Post>(`${URL}/update`, formData);
    return data;
  },

  createPost: async (postData: PostCreateDto): Promise<Post> => {
    const formData = new FormData();

    formData.append('authorId', postData.authorId.toString());
    formData.append('comments', postData.comments.toString());
    formData.append('image', postData.image![0]);
    formData.append('sectionTitle', postData.sectionTitle);
    formData.append('text', postData.text);
    formData.append('title', postData.title);

    const { data } = await api.post<Post>(`${URL}/create`, formData);
    return data;
  },

  deletePost: async (postData: PostDeleteDto) => {
    return await api.delete<Post>(`${URL}/delete`, {
      data: { ...postData },
    });
  },

  getPostsCount: async () => {
    const { data } = await api.get(`${URL}/allCount`);
    return data;
  },
};
