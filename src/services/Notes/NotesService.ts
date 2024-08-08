import api from '@src/lib/api';
import { createGetParams } from '@src/utilities/apiUtils';
import { INote } from '@src/types/Note';

interface IGetNotesParams {
  title?: string|null;
  color?: string|null;
}

interface IGetNotesResponse {
  data: INote[];
}

interface IGetNoteByIdResponse {
  data: INote;
}

export default class NotesService {
  static getNotes(params: IGetNotesParams) {
    return api.get<IGetNotesResponse>(`/notes?${createGetParams(params)}`);
  }

  static getNoteById(noteId: number) {
    return api.get<IGetNoteByIdResponse>(`/notes/${noteId}`);
  }

  static createNote() {
    //
  }

  static updateNote() {
    //
  }

  static deleteNote() {
    //
  }

  static addFile() {
    //
  }

  static deleteFile() {
    //
  }
}