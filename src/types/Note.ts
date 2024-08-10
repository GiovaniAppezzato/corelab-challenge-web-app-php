import { ITimestamps } from '@src/types/Common';
import { IFile } from '@src/types/File';

export interface INote extends ITimestamps {
  id: number;
  title: string;
  content: string;
  color: string|null;
  is_favorite: boolean;
  file: IFile|null;
}
