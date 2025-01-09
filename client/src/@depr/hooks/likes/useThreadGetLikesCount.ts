import LikeService from '@/services/LikeService';
import { useQuery } from '@tanstack/react-query';

const useThreadGetLikes = (threadId: number) => {
  return useQuery({
    queryKey: ['likes', threadId],
    queryFn: () => LikeService.getThreadLikesCount(threadId),
  });
};

export default useThreadGetLikes;
