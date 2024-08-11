import React, { useState } from "react";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import * as yup from "yup";
import { INote } from "@src/types/Note";
import { Button } from "@src/components";
import NotesService from "@src/services/Notes";
import Toast from "@src/lib/toast";
import "@src/styles/components/_create-note-form.scss";

interface ICreateNoteFormProps {
  notes: INote[];
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const schema = yup.object().shape({
  title: yup.string()
    .required("Campo obrigatório")
    .max(40, "Deve ter no máximo 40 caracteres")
    .min(3, "Deve ter no mínimo 3 caracteres")
    .label("Título"),
  content: yup.string()
    .required("Campo obrigatório")
    .label("Conteúdo"),
});

const CreateNoteForm = ({ setNotes }: ICreateNoteFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    is_favorite: false,
  });

  async function handleSubmit() {
    if(!isCreating) {
      setIsCreating(true);
      try {
        await schema.validate(values, { abortEarly: true });
        const note = (await NotesService.createNote({ ...values })).data.data;
        setNotes(notes => [note, ...notes]);
        resetForm();
        Toast.success("Anotação criada com sucesso!");
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          Toast.warning(`${error.params?.label}: ${error.message}`);
        } else {
          Toast.error("Ocorreu um erro ao criar a anotação.");
        }
      } finally {
        setIsCreating(false);
      }
    } 
  }

  function resetForm() {
    setValues({ title: "", content: "", is_favorite: false });
  }

  function handleToggleFavorite() {
    setValues({ ...values, is_favorite: !values.is_favorite });
  }

  function canSubmit() {
    return values.title.length > 0 && values.content.length > 0;
  }

  return (
    <div className="create-note-form">
      <div className="form-header">
        <input 
          type="text" 
          placeholder="Digite o título"
          value={values.title}
          onChange={e => setValues({ ...values, title: e.target.value })}
        />
        {values.is_favorite 
          ? <MdOutlineStar size={24} className={`favorite-icon active`} onClick={handleToggleFavorite} /> 
          : <MdOutlineStarBorder size={24} className={`favorite-icon`} onClick={handleToggleFavorite} />}
      </div>
      <div className="form-body">
        <textarea
          rows={4} 
          placeholder="Digite o conteúdo da nota"
          value={values.content}
          onChange={e => setValues({ ...values, content: e.target.value })}
        />
        
      </div>
      {canSubmit() && (
        <div className="flex justify-end px-1 pb-1">
          <Button onClick={handleSubmit} loading={isCreating}>
            Gravar nota
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateNoteForm;
