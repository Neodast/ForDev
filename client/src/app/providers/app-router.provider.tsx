import LoginPage from '@/components/Pages/Auth/LoginPage';
import RegistrationPage from '@/components/Pages/Auth/RegistrationPage';
import ErrorPage from '@/components/Pages/ErrorPage';
import MainPage from '@/components/Pages/MainPage';
import PostPage from '@/components/Pages/Posts/PostPage';
import PostsPage from '@/components/Pages/Posts/PostsPage';
import ThreadPage from '@/components/Pages/Threads/ThreadPage';
import ThreadsPage from '@/components/Pages/Threads/ThreadsPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

export const AppRouterProvider = () => {
  return <RouterProvider router={router}></RouterProvider>;
};
