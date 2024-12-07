import Layout from '../../Layouts/Layout';
import RightMenuBar from '@/components/RightMenuBar/RightMenuBar';
import { useMemo, useRef } from 'react';
import PostCreateForm from '@/modules/Post/ui/CreateForm';
import usePostsGetAll from '@/hooks/posts/usePostsGetAll';
import Container from '@/components/Post/ui/Container';
import { Pagination, PaginationProps, Skeleton } from 'antd';
import Post from '@/features/Post';
import PostModel from '@/types/models/Post';
import { useSearchParams } from 'react-router-dom';
import usePostsGetCount from '@/hooks/posts/usePostsGetCount';

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    take: '5',
  });

  const { data: posts = Array(5).fill(null), isLoading } = usePostsGetAll(
    Number(searchParams.get('page')) || 1,
    Number(searchParams.get('take')) || 5,
  );
  const { data: postsCount = 5 } = usePostsGetCount();

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
              <Post
                key={post.id}
                name={post.author.name}
                surname={post.author.surname}
                nickname={post.author.nickname}
                postData={post}
                commentsCount={post.comments.length || 0}
                isPreview={false}
                titleClassName="text-base"
                contentClassName="text-sm"
                userInfoClassName="text-base"
              ></Post>
            ))}
            <Pagination
              current={Number(searchParams.get('page'))}
              pageSize={Number(searchParams.get('take')) || 5}
              total={postsCount['postsCount']}
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
          title="Posts page"
          text="This page contain all posts from forum."
          actionTitle="New Post"
          form={<PostCreateForm></PostCreateForm>}
        ></RightMenuBar>
        <div ref={bottomRef}></div>
      </div>
    ),
    [posts, isLoading, searchParams],
  );

  return <Layout>{memoMain}</Layout>;
}
