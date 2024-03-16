import Footer from '../Footer/Footer';
import LoginForm from '../Forms/LoginForm/LoginForm';
import RegistrationForm from '../Forms/RegistrationForm/RegistrationForm';
import Header from '../Header/Header';
import { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegistrationForm></RegistrationForm>,
  },
  {
    path: '/login',
    element: <LoginForm></LoginForm>,
  },
]);

export default function App() {
  console.log('App render');

  const memoHeader = useMemo(() => <Header></Header>, []);
  const memoFooter = useMemo(() => <Footer></Footer>, []);

  return (
    <div className='flex flex-col min-h-screen'>
      {memoHeader}
      <Suspense
        fallback={
          <div className='flex-1 items-center justify-center mt-16 h-96'>
            Loading...
          </div>
        }
      >
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
      {memoFooter}
    </div>
  );
}
