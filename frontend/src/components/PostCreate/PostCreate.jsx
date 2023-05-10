import { Avatar, Button, Card, Form, Input, Space } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import TextArea from 'antd/es/input/TextArea';

import { usePostCreateMutation } from '../../features/post/postApiSlice';

function PostCreate() {
  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const [addPost] = usePostCreateMutation();
  console.log(form);
  const onSubmitHandle = async values => {
    try {
      console.log(values);
      await addPost(values).unwrap();
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    user && (
      <Card>
        <Space align='start' style={{ width: '100%' }}>
          <Avatar gap={4}>{user.name[0].toUpperCase()}</Avatar>
          <Form onFinish={onSubmitHandle} form={form}>
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
            {form.isFieldsTouched() && (
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
        </Space>
      </Card>
    )
  );
}

export default PostCreate;
