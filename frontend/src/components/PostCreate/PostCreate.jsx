import { Avatar, Button, Card, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import TextArea from 'antd/es/input/TextArea';

import { usePostCreateMutation } from '../../features/post/postApiSlice';
import { useState } from 'react';

function PostCreate() {
  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const [focused, setFocused] = useState(false);
  const [addPost] = usePostCreateMutation();

  const onSubmitHandle = async values => {
    try {
      await addPost(values).unwrap();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (
      <Card>
        <div style={{ display: 'flex', width: '100%' }}>
          <Avatar style={{ flexShrink: 0 }} gap={4}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <Form
            onFinish={onSubmitHandle}
            form={form}
            onFocus={() => {
              setFocused(true);
            }}
            style={{ width: '100%' }}
          >
            <Form.Item
              name='title'
              rules={[
                {
                  required: true,
                  message: 'The field should not be empty',
                },
              ]}
            >
              <Input
                placeholder='Enter the title'
                bordered={false}
                maxLength={50}
              />
            </Form.Item>
            {focused && (
              <>
                <Form.Item
                  name='description'
                  rules={[
                    {
                      required: true,
                      message: 'The field should not be empty',
                    },
                  ]}
                >
                  <TextArea
                    autoSize={{ minRows: 2, maxRows: 10 }}
                    placeholder='Enter a description'
                    maxLength={1000}
                    bordered={false}
                  />
                </Form.Item>
                <Button type='primary' htmlType='submit'>
                  Publish
                </Button>
              </>
            )}
          </Form>
        </div>
      </Card>
    )
  );
}

export default PostCreate;
