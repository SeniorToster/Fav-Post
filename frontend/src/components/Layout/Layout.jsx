import { Outlet } from 'react-router';
import CustomHeader from './Header/Header';
import { Col, Layout, Row, Spin } from 'antd';
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
      }}
    >
      <Row>
        <Col span={20} offset={2}>
          <CustomHeader />
          <Content>{isLoading ? <Spin size='large' /> : <Outlet />}</Content>
        </Col>
      </Row>
    </Layout>
  );
}

export default CustomLayout;
