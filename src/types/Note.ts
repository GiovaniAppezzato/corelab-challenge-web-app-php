import { ITimestamps } from './Common';
import { IFile } from './File';

export interface INote extends ITimestamps {
  id: number;
  title: string;
  content: string;
  color: string;
  file: IFile|null;
}
