import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import PostsPage from '../Pages/PostsPage';
import QueryProvider from '../../providers/QueryProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div></div>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/board',
        element: <PostsPage></PostsPage>,
      },
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
      <QueryProvider>
        <RouterProvider router={router}></RouterProvider>
      </QueryProvider>
    </>
  );
}
