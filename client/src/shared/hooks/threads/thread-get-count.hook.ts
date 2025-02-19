import { threadService } from '@/shared/api/services';
import { useQuery } from '@tanstack/react-query';

const useThreadsGetCount = () => {
  return useQuery({
    queryKey: ['threadsCount'],
    queryFn: threadService.getThreadsCount,
  });
};

export default useThreadsGetCount;
