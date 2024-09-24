export const ModalEnum = {
  CREATE_FOLDER: 'CREATE_FOLDER',
  UPDATE_RESOURCE: 'UPDATE_RESOURCE',
  UPLOAD_FILE: 'UPLOAD_FILE',
  CREATE_PERMISSION: 'CREATE_PERMISSION',
  CONFIRM_DELETE: 'CONFIRM_DELETE',
  NONE: 'NONE',
};

export type ModalType = (typeof ModalEnum)[keyof typeof ModalEnum];
