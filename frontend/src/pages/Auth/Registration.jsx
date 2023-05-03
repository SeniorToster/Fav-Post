import { Button, Card, Form } from 'antd';
import styles from './auth.module.scss';
import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import InputNickName from '../../components/UI/InputNickName';
import InputConfirmPass from '../../components/UI/InputConfirmPass';

function Registration() {
  const namePass = 'password';
  return (
    <div className={styles.wrapper}>
      <Card style={{ width: 400 }} title='Registration'>
        <Form>
          <InputNickName />
          <InputEmail />
          <InputPass name={namePass} />
          <InputConfirmPass name={'confirm_pass'} dependencies={[namePass]} />
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Registration;
