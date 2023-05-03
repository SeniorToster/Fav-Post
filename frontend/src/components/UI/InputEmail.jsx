import { Form, Input } from 'antd';
import { MailOutlined } from '@ant-design/icons';

function InputEmail() {
  return (
    <Form.Item
      name='email'
      rules={[
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
    >
      <Input size='large' prefix={<MailOutlined />} placeholder='E-mail' />
    </Form.Item>
  );
}

export default InputEmail;
