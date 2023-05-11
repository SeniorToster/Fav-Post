import { Avatar, Button, Space, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from '../features/auth/authSlice';
import { useUserQuery } from '../features/auth/authApiSlice';

function User() {
  const user = useSelector(selectUser);
  const { userId } = useParams();
  const { data, isLoading } = useUserQuery(userId);
  console.log(data);
  console.log(user);
  if (isLoading) return <Spin />;

  return (
    <Space
      direction='vertical'
      align='center'
      style={{ width: '100%', justifyContent: 'center' }}
    >
      <Avatar gap={4} size={64}>
        {data.name[0].toUpperCase()}
      </Avatar>
      <Typography.Title>{data.name}</Typography.Title>
      {user?.id === data.id && (
        <Link to='setting'>
          <Button>Edit profile</Button>
        </Link>
      )}
    </Space>
  );
}

export default User;
