import { Button, Card, Form, Space, Typography } from 'antd';
import styles from './auth.module.scss';
import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className={styles.wrapper}>
      <Card style={{ width: 400 }} title='Authorization'>
        <Form>
          <InputEmail />
          <InputPass />
          <Space direction='vertical'>
            <Button type='primary' htmlType='submit'>
              Log in
            </Button>
            <Typography.Text size='6'>
              Or <Link to='/registration'>register now!</Link>
            </Typography.Text>
          </Space>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
