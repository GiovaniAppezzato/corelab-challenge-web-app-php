import { Fragment, useState, useEffect } from "react";
import { CreateNoteForm, Header, Note, Divider, Alert } from "@src/components";
import { INote } from "@src/types/Note";
import NotesService from "@src/services/Notes";

const NotesPage = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    async function fetchInitialNotes() {
      try {
        const response = await NotesService.getNotes({});
        setNotes(response.data.data);
      } catch (error) {
        console.error("An error occurred while fetching notes", error);
      }
    }
    fetchInitialNotes();
  }, []);

  function onSearch(value: string) {
    // 
  }

  function onCreate(note: INote) {
    setNotes([...notes, note]);
  }

  function onEdit(note: INote) {
    setNotes(notes.map(n => (n.id === note.id ? note : n)));
  }

  return (
    <Fragment>
      <Header onSearch={onSearch} />
      <main className='p-2'>
        <div className='flex justify-center align-center'>
          <CreateNoteForm onCreate={onCreate} />
        </div>
        <Divider label="Listagem das anotações" />
        {notes.length > 0 ? (
          <Fragment>
            <div>
              <p className="fs-14 mb-1 ml-1">Outras</p>
              <div className="flex flex-wrap gap-2">
                {notes.map(note => <Note key={note.id} note={note} onEdit={onEdit} />)}
              </div>
            </div>
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
