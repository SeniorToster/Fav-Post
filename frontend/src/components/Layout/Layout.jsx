import { Outlet } from 'react-router';
import CustomHeader from './Header/Header';

function CustomLayout() {
  return (
    <>
      <CustomHeader />
      <Outlet />
    </>
  );
}

export default CustomLayout;
