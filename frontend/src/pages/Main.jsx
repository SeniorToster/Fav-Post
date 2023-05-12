import { Col, Row, Space } from 'antd';
import PostsList from '../components/PostsList/PostsList';
import UsersList from '../components/usersList/usersList';
import PostCreate from '../components/PostCreate/PostCreate';

import { usePostsQuery } from '../features/post/postApiSlice';

function Main() {
  const { data = [], isLoading } = usePostsQuery();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col md={{ span: 18 }} xs={{ span: 24 }}>
          <Space direction='vertical' size={16} style={{ width: '100%' }}>
            <PostCreate />
            <PostsList list={data} loading={isLoading} />
          </Space>
        </Col>
        <Col md={{ span: 6 }} xs={{ span: 24 }}>
          <UsersList />
        </Col>
      </Row>
    </>
  );
}

export default Main;
