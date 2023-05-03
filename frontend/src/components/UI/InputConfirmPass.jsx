import PropTypes from 'prop-types';
import { LockOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

InputConfirmPass.propTypes = {
  name: PropTypes.string.isRequired,
  dependencies: PropTypes.array.isRequired
};

function InputConfirmPass({ name, dependencies }) {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error('The two passwords that you entered do not match!')
            );
          },
        }),
      ]}
    >
      <Input.Password
        size='large'
        prefix={<LockOutlined className='site-form-item-icon' />}
        placeholder='Confirm password '
      />
    </Form.Item>
  );
}

export default InputConfirmPass;
