import { Outlet } from 'react-router';
import CustomHeader from './Header/Header';
import { Layout, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useRefreshQuery } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { actionsAuth } from '../../features/auth/authSlice';
import { useEffect } from 'react';

function CustomLayout() {
  const { data, isSuccess, isLoading } = useRefreshQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(actionsAuth.setCredential({ ...data }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <>
          <CustomHeader />
          <Content>
            <Outlet />
          </Content>
        </>
      )}
    </Layout>
  );
}

export default CustomLayout;
