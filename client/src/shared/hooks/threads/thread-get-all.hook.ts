import { threadService } from '@/shared/api/services';
import { useQuery } from '@tanstack/react-query';

const useThreadsGetAll = (page: number, take: number) => {
  return useQuery({
    queryKey: ['threads', page, take],
    queryFn: () => threadService.getAllThreads(page, take),
  });
};

export default useThreadsGetAll;
