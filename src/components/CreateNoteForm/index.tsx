import { useState } from "react";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import * as yup from "yup";
import { INote } from "@src/types/Note";
import { Button } from "@src/components";
import NotesService from "@src/services/Notes";
import styles from "./CreateNoteForm.module.scss";

interface ICreateNoteFormProps {
  onCreate: (note: INote) => void;
}

const schema = yup.object().shape({
  title: yup.string().required().max(40).label("Título"),
  content: yup.string().required().label("Conteúdo"),
});

const CreateNoteForm = ({ onCreate }: ICreateNoteFormProps) => {
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
        await schema.validate(values, { abortEarly: false });
        const note = (await NotesService.createNote({ ...values })).data.data;
        onCreate(note);
        setValues({ title: "", content: "", is_favorite: false });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log("Validation: ", error);
        }
      } finally {
        setIsCreating(false);
      }
    } 
  }

  function handleToggleFavorite() {
    setValues({ ...values, is_favorite: !values.is_favorite });
  }

  function canSubmit() {
    return values.title.length > 0 && values.content.length > 0;
  }

  return (
    <div className={styles.Form}>
      <div className={styles.FormHeader}>
        <input 
          type="text" 
          placeholder="Digite o título"
          value={values.title}
          onChange={e => setValues({ ...values, title: e.target.value })}
        />
        {values.is_favorite 
          ? <MdOutlineStar size={24} className={`${styles.FavoriteIcon} ${styles.Active}`} onClick={handleToggleFavorite} /> 
          : <MdOutlineStarBorder size={24} className={styles.FavoriteIcon} onClick={handleToggleFavorite} />}
      </div>
      <div className={styles.FormBody}>
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
