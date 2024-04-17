import Post from '@/components/Posts/Post/Post';
import Layout from '../components/Layouts/Layout';
import { useMutation, useQuery } from '@tanstack/react-query';
import PostService from '@/services/PostService';
import IPost from '@/types/models/IPost';

export default function PostsPage() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: PostService.getAllPosts,
  });

  const postMutation = useMutation({
    mutationKey: ['postEdit'],
    mutationFn: PostService.editPost,
    onSuccess: () => {
      postsQuery.refetch();
    },
  });

  return (
    <>
      <Layout>
        <div className="text-4xl text-center my-16 flex-1 items-center justify-center">
          {postsQuery.data?.data.map((post) => (
            <Post
              title={post.title}
              nickname={post.author.nickname}
              likes={post.likes}
              editHandler={handleLike}
            >
              <p>{post.text}</p>
            </Post>
          ))}
        </div>
      </Layout>
    </>
  );

  async function handleLike(post: IPostUpdate) {
    try {
      await postMutation.mutateAsync({...post});
    } catch (error) {
      console.error('Помилка при редагуванні поста:', error);
    }
  }
}
