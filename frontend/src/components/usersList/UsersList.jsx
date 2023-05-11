import { Card, Space, Spin, Tag } from 'antd';
import { Link } from 'react-router-dom';

import { useUsersQuery } from '../../features/auth/authApiSlice';

function UsersList() {
  const { data, isLoading, isFetching } = useUsersQuery();

  if (isLoading || isFetching) return <Spin />;

  return (
    <Card title='Registered Users' style={{ width: 300 }}>
      <Space size={4} wrap={'true'}>
        {data.map(user => (
          <Link key={user.id} to={`/user/${user.id}`}>
            <Tag bordered={false}>{user.name}</Tag>
          </Link>
        ))}
      </Space>
    </Card>
  );
}

export default UsersList;
