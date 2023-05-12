import { GithubOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import Link from 'antd/es/typography/Link';

function Footer() {
  return (
    <>
      <Divider />
      <div
        style={{
          textAlign: 'center',
          backgroundColor: '#141414',
          paddingBottom: '24px',
          flex: '0 0 auto',
        }}
      >
        <Link href='https://github.com/SeniorToster/auth'>
          <GithubOutlined /> app repository
        </Link>
      </div>
    </>
  );
}

export default Footer;
