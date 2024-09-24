import { Outlet } from 'react-router-dom';
import { Header, Main } from './components';
import { Modal } from '../../modals';

export const DefaultLayout = () => {
  return (
    <div className="">
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Modal />
    </div>
  );
};
