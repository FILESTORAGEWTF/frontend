import { createPortal } from 'react-dom';
import useBoundStore from '~/store/useStore';
import { ModalEnum } from '~/types';
import { PermissionsForm, ResourceForm } from '~/components';
import { ConfirmDelete } from './components';
import { FileForm } from '~/components';
import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';

export const Modal = () => {
  const { closeModal, modalData } = useBoundStore();
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
            isShared={modalData.data.isShared}
          />
        );

      case ModalEnum.CONFIRM_DELETE:
        return <ConfirmDelete resourceId={modalData.data.resourceId} name={modalData.data.name} />;

      case ModalEnum.UPLOAD_FILE:
        return <FileForm folderId={modalData.data.folderId} />;

      case ModalEnum.CREATE_PERMISSION:
        return <PermissionsForm resourceId={modalData.data.resourceId} name={modalData.data.name} />;

      default:
        return null;
    }
  };

  const modalRef = useRef<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as HTMLElement)) {
      closeModal();
    }
  };

  return createPortal(
    <div
      onClick={handleClick}
      className="bg-slate-950 bg-opacity-50 h-screen w-screen absolute top-0 flex justify-center items-center"
    >
      <div className="bg-slate-100 rounded-3xl pt-3 px-5 shadow-md relative" ref={modalRef}>
        <button className="absolute right-3 top-3" onClick={closeModal}>
          <IoClose className="text-2xl text-grey-300" />
        </button>
        <h3 className="text-blue-600"></h3>
        {modalToDisplay()}
      </div>
    </div>,
    document.body
  );
};
