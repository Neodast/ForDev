import { api } from '@/shared/api';
import { ThreadCreate, ThreadUpdate } from '@/shared/models/dtos';
import { Thread } from '@/shared/models/entities';

const URL = '/thread';

export const threadService = {
  getAllThreads: async (page: number, take: number): Promise<Thread[]> => {
    if (page > 1) {
      page += take;
    }
    const { data } = await api.get<Thread[]>(`${URL}/all`, {
      params: {
        skip: page - 1,
        take: take,
      },
    });
    return data;
  },

  getThreadById: async (threadId: number): Promise<Thread> => {
    const { data } = await api.get(`${URL}`, {
      params: { threadId: threadId },
    });
    return data;
  },

  editThread: async (threadUpdateData: ThreadUpdate): Promise<Thread> => {
    const { data } = await api.put<Thread>(`${URL}/update`, threadUpdateData);
    return data;
  },

  createThread: async (threadCreateData: ThreadCreate): Promise<Thread> => {
    const { data } = await api.post<Thread>(`${URL}/create`, threadCreateData);
    return data;
  },

  deleteThread: async (threadId: number) => {
    return await api.delete(`${URL}/delete`, {
      data: { id: threadId },
    });
  },

  getThreadsCount: async () => {
    const { data } = await api.get(`${URL}/allCount`);
    return data;
  },
};
