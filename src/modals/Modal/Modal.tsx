import { createPortal } from 'react-dom';
import useBoundStore from '../../store/useStore';
import { ModalEnum } from '../../types';
import { PermissionsForm, ResourceForm } from '../../components';
import { ConfirmDelete } from './components';
import { FileForm } from '../../components/FileForm';

export const Modal = () => {
  const { closeModal, modalData } = useBoundStore();
  if (modalData.modalType === ModalEnum.NONE) return null;

  const modalToDisplay = () => {
    switch (modalData.modalType) {
      case ModalEnum.CREATE_FOLDER:
        return <ResourceForm parentId={modalData.data.folderId} />;

      case ModalEnum.UPDATE_RESOURCE:
        return (
          <ResourceForm
            parentId={modalData.data.folderId}
            resourceId={modalData.data.resourceId}
            initialValues={modalData.data.initialValues}
          />
        );

      case ModalEnum.CONFIRM_DELETE:
        return <ConfirmDelete resourceId={modalData.data.resourceId} />;

      case ModalEnum.UPLOAD_FILE:
        return <FileForm folderId={modalData.data.folderId} />;

      case ModalEnum.CREATE_PERMISSION:
        return <PermissionsForm resourceId={modalData.data.resourceId} />;

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
