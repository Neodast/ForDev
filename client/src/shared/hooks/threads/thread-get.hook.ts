import { threadService } from '@/shared/api/services';
import { useQuery } from '@tanstack/react-query'

const useThreadGet = (threadId: number) => {
  return useQuery({
    queryKey: ['thread', threadId],
    queryFn: () => threadService.getThreadById(threadId),
  })
}

export default useThreadGet;