import { Form, Input } from 'antd';

// eslint-disable-next-line react/prop-types
function InputText({ placeholder}) {
  return (
    <Form.Item
      name='nickname'
      label='Nickname'
      tooltip='What do you want others to call you?'
      rules={[
        {
          required: true,
          message: 'Please input your nickname!',
          whitespace: true,
        },
      ]}
    >
      <Input placeholder={placeholder} />
    </Form.Item>
  );
}

export default InputText;
