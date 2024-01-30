import Footer from '../Footer/Footer';
import LoginForm from '../Forms/LoginForm/LoginForm';
import Header from '../Header/Header';
import { Suspense, lazy } from 'react';

const RegisterForm = lazy(
  () => import('../Forms/RegistrationForm/RegistrationForm')
);

export default function App() {
  console.log('App render');

  return (
    <div className='flex flex-col min-h-screen'>
      <Header></Header>
      <Suspense
        fallback={
          <div className='flex-1 items-center justify-center mt-16 h-96'></div>
        }
      >
        <RegisterForm></RegisterForm>
      </Suspense>
      <Suspense
        fallback={
          <div className='flex-1 items-center justify-center mt-16 h-96'></div>
        }
      >
        <LoginForm></LoginForm>
      </Suspense>
      <Footer></Footer>
    </div>
  );
}
