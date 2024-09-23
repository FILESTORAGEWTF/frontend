export const ModalEnum = {
  CREATE_FOLDER: 'CREATE_FOLDER',
  UPLOAD_FILE: 'UPLOAD_FILE',
  CREATE_INVITATION: 'CREATE_PERMISSION',
  CONFIRM_DELETE: 'CONFIRM_DELETE',
  NONE: 'NONE',
};

export type ModalType = (typeof ModalEnum)[keyof typeof ModalEnum];
