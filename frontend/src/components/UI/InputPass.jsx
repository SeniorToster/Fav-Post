import { Form, Input } from 'antd';

function InputPass() {
  return (
    <Form.Item
      name='password'
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
      hasFeedback
    >
      <Input.Password placeholder='Password' />
    </Form.Item>
  );
}

export default InputPass;
