export interface Resource {
  id: number;
  name: string;
  level: number;
  parentId: number | null;
  type: ResourceType;
}

export enum ResourceType {
  FOLDER = 'folder',
  FILE = 'file',
}

export interface UpdateResourceData {
  name: string;
  parentId: number;
  sharable: boolean;
  id: number;
}

export interface CreateResourceData {
  name: string;
  parentId: number;
  sharable: boolean;
}
