import { Avatar, Button, Card, Form, Input, Space } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

function PostCreate() {
  const user = useSelector(selectUser);
  const [value, setValue] = useState('');

  return (
    user && (
      <Card>
        <Space align='start' style={{ width: '100%' }}>
          <Avatar gap={4}>{user.name[0].toUpperCase()}</Avatar>
          <Form>
            <Input
              placeholder='Enter the title'
              bordered={false}
              style={{ width: '100%' }}
              onChange={e => setValue(e.target.value)}
            />
            {value && (
              <>
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  placeholder='Enter a description'
                  maxLength={1000}
                  bordered={false}
                  style={{ width: '100%' }}
                />
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
