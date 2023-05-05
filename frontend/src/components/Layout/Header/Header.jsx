import { Avatar, Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionsAuth, selectUser } from '../../../features/auth/authSlice';
import { useLazyLogoutQuery } from '../../../features/auth/authApiSlice';

function CustomHeader() {
  const user = useSelector(selectUser);
  const [logoutTrigger] = useLazyLogoutQuery();
  const dispatch = useDispatch();

  const logoutHandle = async () => {
    await logoutTrigger().unwrap();
    dispatch(actionsAuth.logout());
  };

  return (
    <div className={styles.header}>
      <Link to={'/'}>
        <Typography.Title level={1}>Employees</Typography.Title>
      </Link>

      <Space>
        {user ? (
          <>
            <Avatar gap={'4'}>{user.name[0].toUpperCase()}</Avatar>
            <Typography.Title style={{ margin: '0' }} level={4}>
              {user.name}
            </Typography.Title>
            <Button
              onClick={logoutHandle}
              icon={<LogoutOutlined />}
              type='primary'
              ghost
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to={'/registration'}>
              <Button icon={<LogoutOutlined />} type='primary'>
                Sing App
              </Button>
            </Link>
            <Link to={'/login'}>
              <Button icon={<UserOutlined />} type='primary' ghost>
                Sing In
              </Button>
            </Link>
          </>
        )}
      </Space>
    </div>
  );
}

export default CustomHeader;
