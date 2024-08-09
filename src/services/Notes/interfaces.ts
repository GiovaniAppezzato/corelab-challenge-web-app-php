import { INote } from '@src/types/Note';

export interface IGetNotesParams {
  title?: string|null;
  color?: string|null;
}

export interface IGetNotesResponse {
  data: INote[];
}

export interface ICreateNoteParams {
  title: string;
  content: string;
  is_favorite: boolean;
}

export interface ICreateNoteResponse {
  data: INote;
}