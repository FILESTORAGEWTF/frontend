import useBoundStore from '../store/useStore';
import { ModalEnum } from '../types';

interface Props {
  id: number;
  parentId: string | null;
  name: string;
  shareable: boolean;
}
export const useModal = () => {
  const { openModal } = useBoundStore();
  const openUpdateModal = ({ name, id, parentId, shareable }: Props) =>
    openModal({
      modalType: ModalEnum.UPDATE_RESOURCE,
      data: {
        resourceId: id,
        parentId,
        initialValues: {
          name,
          shareable,
        },
      },
    });

  const openDeleteModal = (resourceId: number, name: string) =>
    openModal({ modalType: ModalEnum.CONFIRM_DELETE, data: { resourceId, name } });

  const openPermissionModal = (resourceId: number, name: string) =>
    openModal({ modalType: ModalEnum.CREATE_PERMISSION, data: { resourceId, name } });

  return {
    openUpdateModal,
    openDeleteModal,
    openPermissionModal,
  };
};
