import { ConfigProvider } from 'antd';
import { AppRouterProvider } from './providers/app-router.provider';
import { AuthProvider } from './providers/auth.provider';
import { QueryProvider } from './providers/query.provider';
import { ApiProvider } from './providers/api.provider';
import { Layout } from '@/pages/Layout/ui/LayoutPage';

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
            <ApiProvider>
              <Layout>
                <AppRouterProvider />
              </Layout>
            </ApiProvider>
          </ConfigProvider>
        </QueryProvider>
      </AuthProvider>
    </>
  );
}
