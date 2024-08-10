import { useState, useCallback } from "react";
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineCreate, MdClose } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import * as yup from 'yup';
import { INote } from "@src/types/Note";
import { NoteAction, Button, ColorPicker } from '@src/components';
import NotesService from "@src/services/Notes";
import Toast from "@src/lib/toast";
import "./note.scss";

interface INoteProps {
  note: INote;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const schema = yup.object().shape({
  title: yup.string()
    .required("Campo obrigatório")
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .label("Título"),
  content: yup.string().required("Campo obrigatório").label("Conteúdo")
});

const Note = ({
  note,
  setNotes,
}: INoteProps) => {
  const { id, title, content, is_favorite, color } = note;
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShowingColorPicker, setIsShowingColorPicker] = useState(false);
  const [values, setValues] = useState({ title, content, color });

  const handleToggleFavorite = useCallback(async () => {
    try {
      setNotes((prevNotes) => {
        return prevNotes.map((_) => {
          if (_.id === id) {
            return { ..._, is_favorite: !_.is_favorite };
          }
          return _;
        });
      });
      NotesService.toggleFavorite(id);
    } catch (error) {
      console.error('An error occurred while toggling favorite', error);
    }
  }
  , [id, setNotes]);

  const handleChangeColor = useCallback(async (color: string|null) => {
    try {
      setNotes((prevNotes) => {
        return prevNotes.map((_) => {
          if (_.id === id) {
            return { ..._, color };
          }
          return _;
        });
      });
      await NotesService.updateNote({ ...note, color });
    } catch (error) {
      console.error('An error occurred while changing color', error);
    }
  }, [id, setNotes]);
  
  const handleDeleteNote = useCallback(async () => {
    try {
      setNotes((prevNotes) => {
        return prevNotes.filter((_) => _.id !== id);
      });
      await NotesService.deleteNote(id);
    } catch (error) {
      console.error('An error occurred while deleting note', error);
    }
  }, [id, setNotes]);

  async function handleSaveChanges() {
    if(!isSaving) {
      setIsSaving(true);
      try {
        await schema.validate(values, { abortEarly: true });
        const note = (await NotesService.updateNote({ id, ...values })).data.data;
        setNotes((prevNotes) => {
          return prevNotes.map((_) => {
            if (_.id === id) {
              return note;
            }
            return _;
          });
        });
        setIsEditMode(false);
        Toast.success('Alterações salvas com sucesso!');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          Toast.warning(`${error.params?.label}: ${error.message}`);
        } else {
          Toast.error('Problemas ao salvar as alterações, tente novamente mais tarde.');
        }
      } finally {
        setIsSaving(false);
      }
    }
  }

  function handleToggleEdit() {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      startEditing();
    }
  }

  function startEditing() {
    setIsEditMode(true);
    setIsShowingColorPicker(false);

    setValues({
      title,
      content,
      color,
    });

    setTimeout(() => document.querySelector<HTMLInputElement>('#title')?.focus(), 100);
  }

  function onColorChange(color: string|null) {
    setIsShowingColorPicker(false);
    handleChangeColor(color);
  }
  
  return (
    <div className='note position-relative' style={{ backgroundColor: color || '#ffffff' }}>
      <div className={`note-header ${isEditMode ? 'editing' : ''}`}>
        {!isEditMode ? (
          <h2 className='note-title text-overflow'>{title}</h2>
        ) : (
          <input 
            type='text' 
            value={values.title} 
            onChange={(e) => setValues({ ...values, title: e.target.value })} 
            id="title"
          />
        )}
        <div className='note-icon' onClick={handleToggleFavorite}>
          {is_favorite ? <MdOutlineStar color="#FFA000" size={24}  /> : <MdOutlineStarBorder size={24} />}
        </div>
      </div>
      <div className={`note-body ${isEditMode ? 'editing' : ''} ${color ? 'border-white' : ''}`}>
        {!isEditMode ? <p>{content}</p> : (
          <textarea 
            value={values.content} 
            onChange={(e) => setValues({ ...values, content: e.target.value })} 
            rows={6}
          />
        )}
      </div>
      <div className='note-footer'>
        <div className='note-actions'>
          <NoteAction 
            icon={<MdOutlineCreate size={24} />} 
            onClick={handleToggleEdit} 
            isActive={isEditMode} 
          />
          {!isEditMode && (
            <ColorPicker
              show={isShowingColorPicker}
              onChange={(value) => onColorChange(value)}
              trigger={
                <NoteAction 
                  icon={<RiPaintFill size={24} />} 
                  onClick={() => setIsShowingColorPicker((prev) => !prev)} 
                  isActive={isShowingColorPicker} 
                />
              }
            />  
          )}
        </div>
        <div className='note-actions'>
          {isEditMode ? (
            <Button onClick={handleSaveChanges} className={'gray'}>
              Salvar alterações
            </Button>
          ) :  (
            <NoteAction 
              icon={<MdClose size={24} />} 
              onClick={handleDeleteNote} 
              isActive={false} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
