import { Outlet } from 'react-router-dom';
import { Header, Main } from './components';
import { BaseModal } from '../../modals';

export const DefaultLayout = () => {
  return (
    <div className="">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <BaseModal />
    </div>
  );
};
