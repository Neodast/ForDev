import AuthService from '@/services/AuthService';
import { useUserStore } from '@/app/store/userStore';
import { useEffect } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setIsLoading = useUserStore((state) => state.setIsLoading);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsLoading(true);
      AuthService.refresh()
        .then((data) => {
          const { user, tokens } = data;
          setUser({ ...user });
          setIsAuth(true);
          localStorage.setItem('accessToken', tokens.accessToken);
        })
        .catch((e) => {
          setUser(null);
          setIsAuth(false);
          localStorage.removeItem('accessToken');
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });

  return children;
};

export default AuthProvider;
