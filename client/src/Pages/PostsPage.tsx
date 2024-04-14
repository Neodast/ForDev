import Post from '@/components/Posts/Post';
import Layout from '../components/Layouts/Layout';

export default function PostsPage() {
  return (
    <>
      <Layout>
        <div className='text-4xl text-center my-16 flex-1 items-center justify-center mt-16'>
          <Post></Post>
        </div>
      </Layout>
    </>
  );
}
