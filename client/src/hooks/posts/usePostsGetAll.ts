import PostService from '@/services/PostService';
import { useQuery } from '@tanstack/react-query';

const usePostsGetAll = (page: number, take: number) => {
  return useQuery({
    queryKey: ['posts', page, take],
    queryFn: () => PostService.getAllPosts(page, take),
  });
};

export default usePostsGetAll;
