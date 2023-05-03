import { Card } from 'antd';
import styles from './login.module.scss';
import InputEmail from '../../components/UI/InputEmail';
import InputPass from '../../components/UI/InputPass';
import InputConfirmPass from '../../components/UI/InputConfirmPass';

function Login() {
  return (
    <div className={styles.login}>
      <Card title='Authorization'>
        Card content
        <InputEmail />
        <InputPass />
        <InputConfirmPass />
      </Card>
    </div>
  );
}

export default Login;
