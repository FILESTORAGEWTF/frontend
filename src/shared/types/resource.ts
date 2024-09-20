export interface Resource {
  id: number;
  name: string;
  level: number;
  parentId: number | null;
  type: 'folder' | 'file';
}
