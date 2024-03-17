import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../Pages/ErrorPage';
import RegistrationPage from '../Pages/RegistrationPage';
import LoginPage from '../Pages/LoginPage';
import PostsPage from '../Pages/PostsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div></div>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: '/register',
    element: <RegistrationPage></RegistrationPage>,
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: 'posts',
    element: <PostsPage></PostsPage>,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
