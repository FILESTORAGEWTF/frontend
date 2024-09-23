import { createPortal } from 'react-dom';
import useBoundStore from '../../store/useStore';
import { ModalEnum } from '../../shared/types';

export const BaseModal = () => {
  const { modalType, closeModal } = useBoundStore();

  if (modalType === ModalEnum.NONE) return null;

  const modalToDisplay = () => {
    switch (modalType) {
      case ModalEnum.CREATE_FOLDER:
        return <div>create folder</div>;
      case ModalEnum.UPLOAD_FILE:
        return <div>upload form</div>;
      case ModalEnum.CREATE_INVITATION:
        return <div>create permission</div>;
      case ModalEnum.CONFIRM_DELETE:
        return <div>confirm delete</div>;
      default:
        return null;
    }
  };

  return createPortal(
    <div className="bg-slate-950 bg-opacity-50 h-screen w-screen absolute top-0 flex justify-center items-center">
      <button onClick={closeModal}>X</button>
      <div className="bg-slate-100 rounded-3xl p-10">
        <h3 className="text-blue-600"></h3>
        {modalToDisplay()}
      </div>
    </div>,
    document.body
  );
};
