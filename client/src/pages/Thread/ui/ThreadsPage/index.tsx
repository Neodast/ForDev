import RightMenuBar from '@/components/RightMenuBar/RightMenuBar';
import { useRef } from 'react';
import { Pagination, PaginationProps, Skeleton } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Thread from '@/features/Thread/ui/Thread/Thread';
import useThreadsGetAll from '@/@depr/hooks/threads/useThreadsGetAll';
import { ThreadModel } from '@/@depr/types/models/Thread';
import ThreadCreateForm from '@/modules/Thread/ui/ThreadCreateForm';
import useThreadsGetCount from '@/@depr/hooks/threads/useThreadGetCount';
import { Container } from 'postcss';

export function ThreadsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    take: '5',
  });

  const { data: posts = Array(5).fill(null), isLoading } = useThreadsGetAll(
    Number(searchParams.get('page')) || 1,
    Number(searchParams.get('take')) || 5,
  );
  const { data: threadsCount = 5 } = useThreadsGetCount();

  const bottomRef = useRef<HTMLDivElement>(null);

  const onChange: PaginationProps['onChange'] = (page, take) => {
    setSearchParams({
      page: String(page),
      take: String(take),
    });
    bottomRef.current?.scrollIntoView(true);
  };

  return (
    <>
      <div className="text-center m-16 mt-20 flex-1 items-center justify-center">
        {!isLoading ? (
          <>
            {posts.map((thread: ThreadModel) => (
              <Thread
                key={thread.id}
                name={thread.author.name}
                surname={thread.author.surname}
                nickname={thread.author.nickname}
                threadData={thread}
                commentsCount={thread.comments.length || 0}
                titleClassName="text-base"
                contentClassName="text-sm"
                userInfoClassName="text-base"
              ></Thread>
            ))}
            <Pagination
              current={Number(searchParams.get('page'))}
              defaultCurrent={1}
              pageSize={Number(searchParams.get('take')) || 5}
              total={threadsCount['threadsCount']}
              onChange={onChange}
            />
          </>
        ) : (
          posts.map(() => (
            <Container className="h-64">
              <Skeleton avatar={true} />
            </Container>
          ))
        )}
        <RightMenuBar
          filters={[]}
          title="Threads page"
          text="This page contain all threads from forum."
          actionTitle="New thread"
          form={<ThreadCreateForm></ThreadCreateForm>}
        ></RightMenuBar>
        <div ref={bottomRef}></div>
      </div>
    </>
  );
}
