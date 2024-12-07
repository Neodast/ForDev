import api from '../app/api';
import Post from '@/types/models/Post';
import PostUpdate from '@/types/board/posts/PostUpdate';
import PostCreate from '@/types/board/posts/PostCreate';
import PostDelete from '@/types/board/posts/PostDelete';
class PostService {
  static getAllPosts = async (page: number, take: number): Promise<Post[]> => {
    if (page > 1) {
      page += take;
    }
    const { data } = await api.get<Post[]>('/post/all', {
      params: {
        skip: page - 1,
        take: take,
      },
    });
    return data;
  };

  static getPostById = async (postId: number): Promise<Post> => {
    const { data } = await api.get('/post', { params: { postId: postId } });
    return data;
  };

  static editPost = async (postData: PostUpdate) => {
    const formData = new FormData();

    formData.append('id', postData.id.toString());
    formData.append('text', postData.text);
    formData.append('title', postData.title);
    formData.append('image', postData.image![0]);

    const { data } = await api.put<Post>('/post/update', formData);
    return data;
  };

  static createPost = async (postData: PostCreate): Promise<Post> => {
    const formData = new FormData();

    formData.append('authorId', postData.authorId.toString());
    formData.append('comments', postData.comments.toString());
    formData.append('image', postData.image![0]);
    formData.append('sectionTitle', postData.sectionTitle);
    formData.append('text', postData.text);
    formData.append('title', postData.title);

    const { data } = await api.post<Post>('/post/create', formData);
    return data;
  };

  static deletePost = async (postData: PostDelete) => {
    return await api.delete<Post>('/post/delete', {
      data: { ...postData },
    });
  };

  static getPostsCount = async () => {
    const { data } = await api.get('/post/allCount');
    return data;
  };
}

export default PostService;
