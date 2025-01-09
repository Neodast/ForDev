import ThreadService from '@/services/ThreadService';
import { useQuery } from '@tanstack/react-query';

const useThreadsGetCount = () => {
  return useQuery({
    queryKey: ['threadsCount'],
    queryFn: ThreadService.getThreadsCount,
  });
};

export default useThreadsGetCount;
