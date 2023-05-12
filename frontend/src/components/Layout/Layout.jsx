import { Outlet } from 'react-router';
import { Layout, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Footer from './Footer/Footer';
import Header from './Header/Header';

import { actionsAuth } from '../../features/auth/authSlice';
import { useRefreshQuery } from '../../features/auth/authApiSlice';

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
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </Layout>
  );
}

export default CustomLayout;
