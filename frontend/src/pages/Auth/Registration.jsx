import { Button, Card, Form, Space } from 'antd';

import styles from './auth.module.scss';
import useAuth from '../../hook/useAuth';
import { useRegistrationMutation } from '../../features/auth/authApiSlice';

import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import InputNickName from '../../components/UI/InputNickName';
import InputConfirmPass from '../../components/UI/InputConfirmPass';
import Alert from '../../components/UI/Alert';

const namePass = 'password';

function Registration() {
  const [registration] = useRegistrationMutation();
  const [onSubmit, error] = useAuth(registration);

  return (
    <div className={styles.wrapper}>
      <Card style={{ width: 400 }} title='Registration'>
        <Form onFinish={onSubmit}>
          <InputNickName />
          <InputEmail />
          <InputPass name={namePass} />
          <InputConfirmPass name={'confirm_pass'} dependencies={[namePass]} />
          <Space direction='vertical' style={{ width: '100%' }}>
            {error && <Alert type='error' message={error} />}
            <Button type='primary' htmlType='submit'>
              Register
            </Button>
          </Space>
        </Form>
      </Card>
    </div>
  );
}

export default Registration;
