import { Col, Row } from 'antd';
import PostsList from '../components/PostsList/PostsList';
import UsersList from '../components/usersList/usersList';



function Main() {
  return (
    <>
      <Row gutter={[16, 0]} wrap={false}>
        <Col flex='auto'>
          <PostsList />
        </Col>
        <Col flex='none'>
          <UsersList />
        </Col>
      </Row>
    </>
  );
}

export default Main;
