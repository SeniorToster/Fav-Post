import { Button, Card, Form, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { useLoginMutation } from '../../features/auth/authApiSlice';

import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import Alert from '../../components/UI/Alert';
import useAuth from '../../hook/useAuth';

function Login() {
  const [login] = useLoginMutation();
  const [onSubmit, error] = useAuth(login);

  return (
    <div className={styles.wrapper}>
      <Card style={{ width: 400 }} title='Authorization'>
        <Form onFinish={onSubmit}>
          <InputEmail />
          <InputPass name={'password'} />
          <Space direction='vertical' style={{ width: '100%' }}>
            {error && <Alert type='error' message={error} />}
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
