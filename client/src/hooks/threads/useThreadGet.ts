import ThreadService from '@/services/ThreadService';
import { useQuery } from '@tanstack/react-query'

const useThreadGet = (threadId: number) => {
  return useQuery({
    queryKey: ['thread', threadId],
    queryFn: () => ThreadService.getThreadById(threadId),
  })
}

export default useThreadGet;