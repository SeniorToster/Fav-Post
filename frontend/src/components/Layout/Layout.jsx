import { Outlet } from 'react-router';
import CustomHeader from './Header/Header';
import { Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useRefreshQuery } from '../../features/auth/authApiSlice';

function CustomLayout() {
  const { isLoading } = useRefreshQuery();
  console.log(isLoading);

  return (
    <Layout
      style={{
        backgroundColor: '#141414',
        height: '100vh',
        padding: '0 20px',
        maxWidth: '1220px',
        margin: '0 auto',
      }}
    >
      <CustomHeader />
      <Content>{isLoading ? <Spin size='large' /> : <Outlet />}</Content>
    </Layout>
  );
}

export default CustomLayout;
