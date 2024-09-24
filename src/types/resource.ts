export interface Resource {
  id: number;
  name: string;
  level: number;
  parentId: number | null;
  type: ResourceType;
  permissionType?: PermissionType;
  shareable: boolean;
}

export enum ResourceType {
  FOLDER = 'folder',
  FILE = 'file',
}

export enum PermissionType {
  READ = 'read',
  UPDATE = 'update',
}

export interface UpdateResourceData {
  name: string;
  shareable: boolean;
}

export interface CreateResourceData {
  name: string;
  parentId: string | null;
  shareable: boolean;
  type: ResourceType.FOLDER;
}
