import PostService from '@/services/PostService';
import { useQuery } from '@tanstack/react-query';

const usePostsGetAll = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: PostService.getAllPosts,
  });
};

export default usePostsGetAll;
