import { Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostLikedMutation } from '../../features/post/postApiSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';

function ButtonLike({ postId, likes }) {
  const user = useSelector(selectUser);
  const [like, setLike] = useState(likes);
  const [liked, { isLoading }] = usePostLikedMutation();
  const navigate = useNavigate();

  const likeHandle = async () => {
    try {
      const likeData = await liked(postId).unwrap();
      setLike(likeData);
    } catch (error) {
      navigate('/login');
    }
  };

  const isLaked = useMemo(() => {
    const isLaked = like.filter(likeItem => likeItem.id === user?.id);

    return !!isLaked.length;
  }, [like, user]);

  return (
    <>
      {isLaked ? (
        <Button
          loading={isLoading}
          danger
          shape='round'
          icon={<HeartTwoTone twoToneColor='#eb2f96' />}
          style={{ fontWeight: 700 }}
          onClick={likeHandle}
        >
          {String(like.length)}
        </Button>
      ) : (
        <Button
          loading={isLoading}
          shape='round'
          icon={<HeartTwoTone />}
          style={{ fontWeight: 700 }}
          onClick={likeHandle}
        >
          {String(like.length)}
        </Button>
      )}
    </>
  );
}

export default ButtonLike;
