import PostService from '@/services/PostService';
import { useQuery } from '@tanstack/react-query';

const useGetAllPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: PostService.getAllPosts,
  });
};

export default useGetAllPosts;
