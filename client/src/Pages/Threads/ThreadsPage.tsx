import Layout from '../../components/Layouts/Layout';
import RightMenuBar from '@/components/Posts/RightMenuBar/RightMenuBar';
import { useMemo, useRef } from 'react';
import PostCreateForm from '@/components/Posts/Post/PostCreateForm';
import Container from '@/components/Posts/Reusable/Container';
import { Pagination, PaginationProps, Skeleton } from 'antd';
import PostModel from '@/types/models/Post';
import { useSearchParams } from 'react-router-dom';
import Thread from '@/components/Posts/Thread/Thread';
import useThreadsGetAll from '@/hooks/threads/useThreadsGetAll';

export default function ThreadsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    take: '5',
  });

  const { data: posts = Array(5).fill(null), isLoading } = useThreadsGetAll(
    Number(searchParams.get('page')) || 1,
    Number(searchParams.get('take')) || 5,
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const onChange: PaginationProps['onChange'] = (page, take) => {
    setSearchParams({
      page: String(page),
      take: String(take),
    });
    bottomRef.current?.scrollIntoView(true);
  };

  const memoMain = useMemo(
    () => (
      <div className="text-center m-16 mt-20 flex-1 items-center justify-center">
        {!isLoading ? (
          <>
            {posts.map((post: PostModel) => (
              <Thread
                key={post.id}
                name={post.author.name}
                surname={post.author.surname}
                nickname={post.author.nickname}
                postData={post}
                commentsCount={post.comments.length || 0}
                titleClassName="text-base"
                contentClassName="text-sm"
                userInfoClassName="text-base"
              ></Thread>
            ))}
            <Pagination
              current={Number(searchParams.get('page'))}
              defaultCurrent={1}
              pageSize={Number(searchParams.get('take')) || 5}
              total={15}
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
          form={<PostCreateForm></PostCreateForm>}
          stats={{ statName: 'Threads count', statMetric: 5 }}
        ></RightMenuBar>
        <div ref={bottomRef}></div>
      </div>
    ),
    [posts, isLoading, searchParams, onChange],
  );

  return <Layout>{memoMain}</Layout>;
}
