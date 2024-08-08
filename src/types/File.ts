import { ITimestamps } from './Common';

export interface IFile extends ITimestamps {
  id: number;
  name: string;
  mime_type: string;
  original_name: string;
  size: number;
  size_for_humans: string;
  path: string;
}