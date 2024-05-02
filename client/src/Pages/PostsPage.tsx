import Post from '@/components/Posts/Post/Post';
import Layout from '../components/Layouts/Layout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import PostService from '@/services/PostService';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import RightMenuBar from '@/components/Posts/RightMenuBar/RightMenuBar';
import { useCallback, useMemo } from 'react';
import PostCreateForm from '@/components/Posts/Post/PostCreateForm';
import IPostDelete from '@/types/board/posts/IPostDelete';

export default function PostsPage() {
  const queryClient = useQueryClient();

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: PostService.getAllPosts,
  });

  const { mutateAsync: editPost } = useMutation({
    mutationKey: ['editPost'],
    mutationFn: PostService.editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const {mutateAsync: deletePost} = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: PostService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"] });
    }
  })

  const handleLike = useCallback(
    async (post: IPostUpdate) => {
      return await editPost(post);
    },
    [editPost],
  );

  const handleDelete = useCallback(
    async (post: IPostDelete) => {
      return await deletePost(post);
    },
    [deletePost]
  )

  const memoMain = useMemo(
    () => (
      <>
        <div className="text-center m-16 mt-20 flex-1 items-center justify-center">
          {posts.map((post) => (
            <Post
              title={post.title}
              nickname={post.author.nickname}
              options={post}
              editHandler={handleLike}
              deleteHandler={handleDelete}
            >
              <p>{post.text}</p>
            </Post>
          ))}
          <RightMenuBar
            filters={['Front', 'Back', 'Full']}
            actionTitle="New Post"
            form={<PostCreateForm></PostCreateForm>}
          ></RightMenuBar>
        </div>
      </>
    ),
    [posts, handleLike, handleDelete],
  );

  return (
    <div>
      <Layout>{memoMain}</Layout>
    </div>
  );
}
