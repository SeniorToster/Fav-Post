import { Outlet } from 'react-router';
import CustomHeader from './Header/Header';
import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';

function CustomLayout() {
  return (
    <Layout
      style={{
        backgroundColor: '#141414',
        height: '100vh',
      }}
      className='layout'
    >
      <Row>
        <Col span={20} offset={2}>
          <CustomHeader />
          <Content>
            <Outlet />
          </Content>
        </Col>
      </Row>
    </Layout>
  );
}

export default CustomLayout;
