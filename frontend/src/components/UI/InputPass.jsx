import PropTypes from 'prop-types';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

InputPass.propTypes = {
  name: PropTypes.string.isRequired,
};

function InputPass({ name }) {
  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
        size='large'
        prefix={<LockOutlined className='site-form-item-icon' />}
        placeholder='Password'
      />
    </Form.Item>
  );
}

export default InputPass;
