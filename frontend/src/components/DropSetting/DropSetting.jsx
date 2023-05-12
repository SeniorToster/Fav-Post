import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { selectUser } from '../../features/auth/authSlice';
import { usePostDeleteMutation } from '../../features/post/postApiSlice';

DropSetting.propTypes = {
  ownerUserId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

function DropSetting({ ownerUserId, postId }) {
  const user = useSelector(selectUser);
  const [postDelete] = usePostDeleteMutation();

  const items = useMemo(
    () => [
      {
        key: 'delete',
        danger: true,
        label: 'delete post',
        disabled: ownerUserId !== user?.id,
      },
    ],
    [user, ownerUserId]
  );

  const onClick = async ({ key }) => {
    switch (key) {
      case 'delete': {
        console.log(postId);
        await postDelete(postId).unwrap();
      }
    }
  };

  return (
    <Dropdown menu={{ items, onClick }} placement='bottomRight'>
      <a onClick={e => e.preventDefault()}>
        <EllipsisOutlined style={{ fontSize: '24px' }} />
      </a>
    </Dropdown>
  );
}

export default DropSetting;
