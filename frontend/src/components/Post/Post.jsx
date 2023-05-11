import { Avatar, Card, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import ButtonLike from '../UI/ButtonLike';
import DropSetting from '../DropSetting/DropSetting';

Post.propTypes = {
  id: PropTypes.string.isRequired,
  ownerUser: PropTypes.object.isRequired,
  created_At: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

function Post({ id, ownerUser, created_At, description, likes, title }) {
  return (
    <Card>
      <Space
        direction='vertical'
        size='large'
        style={{
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to={`/user/${ownerUser.id}`}>
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
          <DropSetting ownerUserId={ownerUser.id} postId={id} />
        </div>

        <Space direction='vertical'>
          <Typography.Title style={{ margin: '0' }} level={3}>
            {title}
          </Typography.Title>
          <Typography.Paragraph
            ellipsis={{
              rows: 3,
              expandable: true,
            }}
          >
            {description}
          </Typography.Paragraph>
          <ButtonLike postId={id} likes={likes} />
        </Space>
      </Space>
    </Card>
  );
}

export default Post;
