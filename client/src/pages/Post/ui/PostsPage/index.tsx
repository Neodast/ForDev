import RightMenuBar from '@/components/RightMenuBar/RightMenuBar';
import { useRef } from 'react';
import PostCreateForm from '@/modules/Post/ui/PostCreateForm';
import usePostsGetAll from '@/@depr/hooks/posts/usePostsGetAll';
import { Pagination, PaginationProps, Skeleton } from 'antd';
import PostModel from '@/@depr/types/models/Post';
import { useSearchParams } from 'react-router-dom';
import usePostsGetCount from '@/@depr/hooks/posts/usePostsGetCount';
import { FeedPost } from '@/features/Post/ui';
import { Container } from '@/components/Post/ui';

export function PostsPage() {
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

  return (
    <div className="text-center m-16 mt-20 flex-1 items-center justify-center">
      {!isLoading ? (
        <>
          {posts.map((post: PostModel) => (
            <FeedPost
              profileInfo={{
                ...post.author,
              }}
              postData={post}
              commentsCount={post.comments.length || 0}
              isPreview={false}
            ></FeedPost>
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
  );
}
