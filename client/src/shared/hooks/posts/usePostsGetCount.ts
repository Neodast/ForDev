import PostService from '@/services/PostService';
import { useQuery } from '@tanstack/react-query';

const usePostsGetCount = () => {
  return useQuery({
    queryKey: ['post', 'count'],
    queryFn: PostService.getPostsCount,
  });
};

export default usePostsGetCount;
