import { Button, Card, Form, Space, Typography } from 'antd';
import styles from './auth.module.scss';
import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { actionsAuth } from '../../features/auth/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmitHandle = async values => {
    try {
      const userData = await login(values).unwrap();
      console.log(userData);
      dispatch(actionsAuth.setCredential(userData));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Card style={{ width: 400 }} title='Authorization'>
        <Form onFinish={onSubmitHandle}>
          <InputEmail />
          <InputPass name={'password'} />
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
