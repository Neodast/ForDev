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
        element: <HomePage></HomePage>,
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
