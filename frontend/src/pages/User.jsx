import { Avatar, Col, Row, Space, Spin, Tabs, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useUserQuery } from '../features/auth/authApiSlice';
import MyPost from '../components/MyPost/MyPost';

function User() {
  const { userId } = useParams();
  const { data, isLoading } = useUserQuery(userId);

  const items = [
    {
      key: '1',
      label: `My posts`,
      children: <MyPost userId={userId} />,
    },
    {
      key: '2',
      label: `Liked posts`,
      children: <MyPost userId={userId} isLiked />,
    },
  ];

  if (isLoading) return <Spin />;

  return (
    <Row>
      <Col flex='auto'>
        <Space align='center' direction='vertical' style={{ width: `100%` }}>
          <Avatar gap={4} size={64}>
            {data.name[0].toUpperCase()}
          </Avatar>
          <Typography.Title>{data.name}</Typography.Title>
        </Space>
        <Tabs centered defaultActiveKey='1' items={items} />
      </Col>
    </Row>
  );
}

export default User;
