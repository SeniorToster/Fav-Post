import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { useUsersQuery } from '../features/auth/authApiSlice';
import { Card, Col, Row, Space, Spin, Tag, Typography } from 'antd';

function Main() {
  const user = useSelector(selectUser);
  const { data, isLoading } = useUsersQuery();

  if (isLoading) return <Spin />;
  console.log(data);

  if (user)
    return (
      <>
        <Row gutter={[16, 0]} wrap={'false'}>
          <Col flex='auto'>
            <Typography.Title>вы {user.name} авторизованы</Typography.Title>
          </Col>
          <Col flex='none'>
            <Card title='Registered Users' style={{ width: 300 }}>
              <Space size={4} wrap={'true'}>
                {data.map(user => (
                  <Tag bordered={false} key={user.id}>
                    {user.name}
                  </Tag>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </>
    );

  return <Typography.Title>Вы не авторизованы</Typography.Title>;
}

export default Main;
