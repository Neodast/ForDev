import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../../Pages/ErrorPage';
import RegistrationPage from '../../Pages/RegistrationPage';
import LoginPage from '../../Pages/LoginPage';
import PostsPage from '../../Pages/PostsPage';
import QueryProvider from '../../providers/QueryProvider';
import AuthProvider from '../../providers/AuthProvider';
import MainPage from '@/Pages/MainPage';
import { ConfigProvider } from 'antd';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // {
      //   path: '/threads',
      //   element: <ThreadPage></ThreadPage>,
      // },
      {
        path: '/',
        element: <MainPage></MainPage>,
      },
      {
        path: '/posts',
        element: <PostsPage></PostsPage>,
      },
      // {
      //   path: "/quizzes",
      //   element: <QuizzesPage></QuizzesPage>
      // },
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
                fontFamily: "Roboto"  ,
              }
            }}
          >
            <RouterProvider router={router}></RouterProvider>
          </ConfigProvider>
        </QueryProvider>
      </AuthProvider>
    </>
  );
}