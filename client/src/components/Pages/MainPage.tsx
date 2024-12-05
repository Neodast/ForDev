import Layout from '@/components/Layouts/Layout';
import Container from '@/components/Post/ui/Container';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <Layout>
      <div className="text-4xl flex-1 items-center justify-center ml-32 w-[100%] mt-20">
        <Container className="px-6">
          <p className="text-3xl flex flex-col space-y-2 font-mono rounded-[4px] bg-slate-700 p-4 text-slate-50">
            <span>
              <span>
                <h2>1. Hello Developers! 👋</h2>
              </span>
            </span>
            <span>
              <span>
                2. Welcome to our vibrant and innovative community! 🎉
              </span>
            </span>
            <span className="flex flex-col">
              <span>
                3. This is a place where you can share your ideas, discuss the
                latest
              </span>
              <span>4. trends in technology, and help each other grow.</span>
              <span>
                5. Whether you're a seasoned developer or just starting out,
              </span>
              <span>6. there's a place for you here.</span>
            </span>
          </p>
        </Container>
        <div className="flex flex-row">
          <Container className="flex flex-col">
            <Link to={'/posts'}>
              <p className="text-2xl text-center">GO TO POSTS</p>
              <Skeleton avatar={true}></Skeleton>
            </Link>
          </Container>
          <Container className="ml-[-15rem] flex flex-col">
            <Link to={'/threads'}>
              <p className="text-2xl text-center">GO TO THREADS</p>
              <Skeleton avatar={true}></Skeleton>
            </Link>
          </Container>
        </div>
      </div>
    </Layout>
  );
}
