import { Fragment, useState, useEffect } from "react";
import { CreateNoteForm, Header, Note, Divider, Alert } from "@src/components";
import { INote } from "@src/types/Note";
import NotesService from "@src/services/Notes";

const NotesPage = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    async function fetchInitialNotes() {
      try {
        const response = await NotesService.getNotes({ title: undefined, color: undefined });
        setNotes(response.data.data);
      } catch (error) {
        console.error("An error occurred while fetching notes", error);
      }
    }
    fetchInitialNotes();
  }, []);

  function onSearch(notes: INote[]) {
    setNotes(notes);
  }

  function renderNotesSection(title: string, filterFn: (note: INote) => boolean) {
    const filteredSectionNotes = notes.filter(filterFn);

    return filteredSectionNotes.length !== 0 ? (
      <div className="mb-2">
        <p className="fs-14 mb-1 ml-1">{title}</p>
        <div className="flex flex-wrap gap-2">
          {filteredSectionNotes.map(note => (
            <Note key={note.id} note={note} setNotes={setNotes} />
          ))}
        </div>
      </div>
    ) : null;
  };

  return (
    <Fragment>
      <Header onSearch={onSearch} />
      <main className='p-2 pb-5'>
        <div className='flex justify-center align-center'>
          <CreateNoteForm notes={notes} setNotes={setNotes} />
        </div>
        <Divider label="Listagem das anotações" />
        {notes.length > 0 ? (
          <Fragment>
            {renderNotesSection("Favoritos", (note) => note.is_favorite)}
            {renderNotesSection("Outros", (note) => !note.is_favorite)}
          </Fragment>
        ) : (
          <Alert className="text-center">
            Nenhuma anotação encontrada! Preencha o formulário acima para adicionar.
          </Alert>
        )}
      </main>
    </Fragment>
  );
};

export default NotesPage;
