import { Empty, Space, Spin } from 'antd';
import PropTypes from 'prop-types';

import Post from '../Post/Post';

PostsList.propTypes = {
  list: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function PostsList({ list, loading }) {
  if (loading) return <Spin />;
  if (!list.length) return <Empty />;
  return (
    <Space direction='vertical' size={16} style={{ width: '100%' }}>
      {list.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </Space>
  );
}

export default PostsList;
