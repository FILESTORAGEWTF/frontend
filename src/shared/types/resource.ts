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
  shareable: boolean;
}

export interface CreateResourceData {
  name: string;
  parentId: string | null;
  shareable: boolean;
  type: ResourceType.FOLDER;
}
