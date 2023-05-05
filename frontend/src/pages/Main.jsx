import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { useUsersQuery } from '../features/auth/authApiSlice';
import { Space, Spin, Typography } from 'antd';

function Main() {
  const user = useSelector(selectUser);
  const { data, isLoading } = useUsersQuery();

  if (isLoading) return <Spin />;
  console.log(data);

  if (user)
    return (
      <>
        <Typography.Title>вы {user.name} авторизованы</Typography.Title>
        <Space direction='vertical'>
          {data.map(user => (
            <Typography.Text key={user.id}>{user.email}</Typography.Text>
          ))}
        </Space>
      </>
    );

  return <Typography.Title>Вы не авторизованы</Typography.Title>;
}

export default Main;
