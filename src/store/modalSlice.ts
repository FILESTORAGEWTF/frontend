import { StateCreator } from 'zustand';
import { ModalEnum } from '~/types';

export const initialModalState = { modalType: ModalEnum.NONE, data: null };

type ModalData =
  | { modalType: typeof ModalEnum.CREATE_FOLDER; data: CreateFolderModalData }
  | { modalType: typeof ModalEnum.UPDATE_RESOURCE; data: UpdateResourceModalData }
  | { modalType: typeof ModalEnum.CONFIRM_DELETE; data: DeleteResourceModalData }

  // TODO add type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { modalType: typeof ModalEnum.CREATE_PERMISSION; data: any }
  | { modalType: typeof ModalEnum.UPLOAD_FILE; data: UploadFileModalData }
  | { modalType: typeof ModalEnum.NONE; data: PermissionModalData };

interface CreateFolderModalData {
  parentId: string;
}

interface UploadFileModalData {
  parentId: string | null;
}

interface DeleteResourceModalData {
  resourceId: number;
  name: string;
}

interface PermissionModalData {
  resourceId: number;
  name: string;
}

export interface UpdateResourceModalData {
  parentId: string;
  resourceId: string;

  // TODO add type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
}

export interface ModalSlice {
  modalData: ModalData;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modalData: initialModalState,
  openModal: (data) => set({ modalData: data }),
  closeModal: () => set({ modalData: initialModalState }),
});

export default createModalSlice;
