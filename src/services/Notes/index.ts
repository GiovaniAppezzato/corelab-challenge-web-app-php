import api from '@src/lib/api';
import { createQueryParams } from '@src/utilities/apiUtils';
import {
  ICreateNoteParams,
  ICreateNoteResponse,
  IGetNotesParams,
  IGetNotesResponse,
  IToggleFavoriteResponse,
  IUpdateNoteParams,
  IUpdateNoteResponse
} from './interfaces';

export default class NotesService {
  static getNotes(params: IGetNotesParams) {
    return api.get<IGetNotesResponse>(`/notes?${createQueryParams(params)}`);
  }

  static getNoteById(noteId: number) {
    // 
  }

  static createNote(params: ICreateNoteParams) {
    return api.post<ICreateNoteResponse>('/notes', params);
  }

  static updateNote(params: IUpdateNoteParams) {
    return api.put<IUpdateNoteResponse>(`/notes/${params.id}`, { ...params, id: undefined });
  }

  static delete() {
    //
  }

  static addFile() {
    //
  }

  static deleteFile() {
    //
  }

  static toggleFavorite(noteId: number) {
    return api.patch<IToggleFavoriteResponse>(`/notes/${noteId}/favorite`);
  }
}