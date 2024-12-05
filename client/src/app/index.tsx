import { ConfigProvider } from 'antd';
import { AppRouterProvider } from './providers/app-router.provider';
import AuthProvider from './providers/auth.provider';
import QueryProvider from './providers/query.provider';

export function App() {
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
            <AppRouterProvider />
          </ConfigProvider>
        </QueryProvider>
      </AuthProvider>
    </>
  );
}
