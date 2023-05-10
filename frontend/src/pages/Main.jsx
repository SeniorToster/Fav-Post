import { Col, Row, Space } from 'antd';
import PostsList from '../components/PostsList/PostsList';
import UsersList from '../components/usersList/usersList';
import PostCreate from '../components/PostCreate/PostCreate';

function Main() {
  return (
    <>
      <Row gutter={[16, 0]} wrap={false}>
        <Col flex='auto'>
          <Space direction='vertical' size={16}>
            <PostCreate />
            <PostsList />
          </Space>
        </Col>
        <Col flex='none'>
          <UsersList />
        </Col>
      </Row>
    </>
  );
}

export default Main;
