import { StateCreator } from 'zustand';
import { ModalEnum, ModalType } from '../shared/types';

export interface ModalSlice {
  modalType: ModalType;
  modalData: null;
  openModal: (modalType: ModalType, data?: any) => void;
  closeModal: () => void;
}

const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  modalType: ModalEnum.NONE,
  modalData: null,
  openModal: (modalType, data = null) => set({ modalType, modalData: data }),
  closeModal: () => set({ modalType: 'NONE', modalData: null }),
});

export default createModalSlice;
