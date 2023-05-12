import { Spin } from 'antd';
import PropTypes from 'prop-types';

import { usePostsUserQuery } from '../../features/post/postApiSlice';
import PostsList from '../PostsList/PostsList';

MyPost.propTypes = {
  userId: PropTypes.string.isRequired,
  isLiked: PropTypes.bool,
};

function MyPost({ userId, isLiked }) {
  const { data = [], isLoading } = usePostsUserQuery({ userId, isLiked });

  if (isLoading) return <Spin />;

  return <PostsList list={data} loading={isLoading} />;
}

export default MyPost;
