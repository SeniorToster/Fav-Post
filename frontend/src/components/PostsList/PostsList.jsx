import { Space, Spin } from 'antd';
import { usePostsQuery } from '../../features/post/postApiSlice';
import Post from '../Post/Post';

function PostsList() {
  const { data, isLoading, isFetching } = usePostsQuery();
  console.log(data);
  if (isLoading || isFetching) return <Spin />;

  return (
    <Space direction='vertical' size={16}>
      {data.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </Space>
  );
}

export default PostsList;
