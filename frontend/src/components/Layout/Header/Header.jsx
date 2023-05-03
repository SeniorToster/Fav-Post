import { Button, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

function CustomHeader() {
  return (
    <div className={styles.header}>
      <Title level={1}>Employees</Title>
      <Space>
        <Link to={'/login'}>
          <Button type='primary'>Sing App</Button>
        </Link>
        <Link to={'/registration'}>
          <Button type='primary' ghost>
            Sing In
          </Button>
        </Link>
      </Space>
    </div>
  );
}

export default CustomHeader;
