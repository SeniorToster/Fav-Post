import { Button, Card, Form } from 'antd';

import styles from './auth.module.scss';
import useAuth from '../../features/hook/useAuth';

import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import InputNickName from '../../components/UI/InputNickName';
import InputConfirmPass from '../../components/UI/InputConfirmPass';
import Alert from '../../components/UI/Alert';
import { useRegistrationMutation } from '../../features/auth/authApiSlice';

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
          {error && <Alert type='error' message={error} />}
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Registration;
