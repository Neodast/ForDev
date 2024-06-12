import api from '@/http';
import ThreadUpdate from '@/types/board/threads/ThreadUpdate';
import { Thread } from '@/types/models/Thread';
import ThreadCreate from '@/types/board/threads/ThreadCreate';

class ThreadService {
  static getAllThreads = async (page: number, take: number): Promise<Thread[]> => {
    const { data } = await api.get<Thread[]>('/thread/all', {params: {
      skip: page-1,
      take: take,
    } });
    return data;
  }

  static getThreadById = async (threadId: number): Promise<Thread> => {
    const { data } = await api.get('/thread', { params: { postId: threadId } });
    return data;
  };

  static editThread = async ( threadUpdateData: ThreadUpdate) : Promise<Thread> => {
    const {data} = await api.put<Thread>('/thread/update', threadUpdateData);
    return data;
  }

  static createThread = async(threadCreateData: ThreadCreate) : Promise<Thread> => {
    const {data} = await api.post<Thread>('/thread/create', threadCreateData);
    return data;
  }

  static deleteThread = async (threadId: number) => {
    return await api.delete("/thread/delete",{
      data: {id: threadId}
    })
  }
}

export default ThreadService;