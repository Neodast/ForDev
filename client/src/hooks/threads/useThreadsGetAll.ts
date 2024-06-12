import ThreadService from '@/services/ThreadService';
import { useQuery } from '@tanstack/react-query';

const useThreadsGetAll = (page: number, take: number) => {
  return useQuery({
    queryKey: ['threads', page, take],
    queryFn: () => ThreadService.getAllThreads(page, take),
  });
};

export default useThreadsGetAll;
