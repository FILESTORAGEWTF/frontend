import { Outlet } from 'react-router-dom';
import { Header, Main } from './components';
import { Modal } from '~/modals';
import { ModalEnum } from '~/types';
import useBoundStore from '~/store/useStore';

export const DefaultLayout = () => {
  const { modalData } = useBoundStore();

  return (
    <div className="">
      <Header />
      <Main>
        <Outlet />
      </Main>
      {modalData.modalType !== ModalEnum.NONE && <Modal />}
    </div>
  );
};
