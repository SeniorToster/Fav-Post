import { Avatar, Card, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ButtonLike from '../UI/ButtonLike';

function Post({ id, ownerUser, created_At, description, likes, title }) {
  return (
    <Card>
      <Space direction='vertical' size='large'>
        <Link as={`/user/${ownerUser.id}`}>
          <Space align='center'>
            <Avatar gap={4} size='large'>
              {ownerUser.name[0].toUpperCase()}
            </Avatar>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography.Title
                style={{ color: '#1668dc', margin: '0' }}
                level={5}
              >
                {ownerUser.name}
              </Typography.Title>
              <Typography.Text type='secondary'>
                {moment(Number(created_At)).format('MMM Do YYYY')}
              </Typography.Text>
            </div>
          </Space>
        </Link>
        <Space direction='vertical'>
          <Typography.Title style={{ margin: '0' }} level={3}>
            {title}
          </Typography.Title>
          <Typography.Text> {description}</Typography.Text>
          <ButtonLike postId={id} likes={likes} />
        </Space>
      </Space>
    </Card>
  );
}

export default Post;
