import { UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

// eslint-disable-next-line react/prop-types
function InputText() {
  return (
    <Form.Item
      name='name'
      rules={[
        {
          required: true,
          message: `Please input your NickName!`,
          whitespace: true,
        },
      ]}
    >
      <Input placeholder={'NickName'} size='large' prefix={<UserOutlined />} />
    </Form.Item>
  );
}

export default InputText;
