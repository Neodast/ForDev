import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';
import RegistrationPage from '../Pages/Auth/RegistrationPage';
import LoginPage from '../Pages/Auth/LoginPage';
import PostsPage from '../Pages/Posts/PostsPage';
import QueryProvider from '../../providers/QueryProvider';
import AuthProvider from '../../providers/AuthProvider';
import MainPage from '@/components/Pages/MainPage';
import { ConfigProvider } from 'antd';
import PostPage from '@/components/Pages/Posts/PostPage';
import ThreadsPage from '@/components/Pages/Threads/ThreadsPage';
import ThreadPage from '@/components/Pages/Threads/ThreadPage';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/threads',
        element: <ThreadsPage></ThreadsPage>,
      },
      {
        path: '/threads/:threadId',
        element: <ThreadPage></ThreadPage>,
      },
      {
        path: '/',
        element: <MainPage></MainPage>,
      },
      {
        path: '/posts',
        element: <PostsPage></PostsPage>,
      },
      {
        path: '/posts/:postId',
        element: <PostPage></PostPage>,
      },
      // {
      //   path: "/board",
      //   element: <BoardPage></BoardPage>
      // }
    ],
  },
  {
    path: '/register',
    element: <RegistrationPage></RegistrationPage>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
]);

export default function App() {
  return (
    <>
      <AuthProvider>
        <QueryProvider>
          <ConfigProvider
            direction="ltr"
            theme={{
              cssVar: true,
              hashed: false,
              token: {
                fontFamily: 'Roboto',
              },
            }}
          >
            <RouterProvider router={router}></RouterProvider>
          </ConfigProvider>
        </QueryProvider>
      </AuthProvider>
    </>
  );
}
