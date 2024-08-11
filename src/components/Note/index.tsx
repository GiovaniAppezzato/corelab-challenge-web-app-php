import { useState, useRef, useEffect, useCallback, Fragment } from "react";
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineCreate, MdClose } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { useDropzone } from 'react-dropzone'
import { BsImages } from "react-icons/bs";
import * as yup from 'yup';
import { INote } from "@src/types/Note";
import { NoteAction, Button, ColorPicker } from '@src/components';
import { generateDataUrl } from '@src/utilities/apiUtils';
import NotesService from "@src/services/Notes";
import Toast from "@src/lib/toast";
import "@src/styles/components/_note.scss";

interface INoteProps {
  note: INote;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

interface IFormValues {
  title: string;
  content: string;
  color: string|null;
  file?: {
    name: string;
    size: number;
    base64: string|null;
  } | null;
}

const baseUrl = process.env.REACT_APP_API_URL;

const schema = yup.object().shape({
  title: yup.string()
    .required("Campo obrigatório")
    .min(3, "Mínimo de 3 caracteres")
    .max(50, "Máximo de 50 caracteres")
    .label("Título"),
  content: yup.string().required("Campo obrigatório").label("Conteúdo")
});

const Note = ({ note, setNotes }: INoteProps) => {
  const { id, title, content, is_favorite, color, file } = note;
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isShowingColorPicker, setIsShowingColorPicker] = useState(false);
  const [values, setValues] = useState<IFormValues>({ title, content, color, file: undefined });
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    multiple: false,
    onDrop: useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const base64 = await generateDataUrl(file);
      setValues({ ...values, file: { name: file.name, size: file.size, base64 } });
    }, [])  
  });

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [values.content]);

  async function handleSaveChanges() {
    if(!isSaving) {
      setIsSaving(true);
      try {
        await schema.validate(values, { abortEarly: true });
        const response = (await NotesService.updateNote({ id, ...values, file: values.file ? values.file.base64 : values.file }))
        setNotes((prevNotes) => {
          return prevNotes.map((_) => {
            if (_.id === id) {
              return response.data.data;
            }
            return _;
          });
        });
        setIsEditMode(false); 
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

  async function handleToggleFavorite() {
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

  async function handleChangeColor(color: string|null) {
    try {
      setNotes((prevNotes) => {
        return prevNotes.map((_) => {
          if (_.id === id) {
            return { ..._, color };
          }
          return _;
        }); 
      });
      await NotesService.updateNote({ id, title, content, color, file: file?.path || null });
    } catch (error) {
      console.error('An error occurred while changing color', error);
    }
  }

  async function handleDeleteNote() {
    try {
      setNotes((prevNotes) => {
        return prevNotes.filter((_) => _.id !== id);
      });
      NotesService.deleteNote(id);
    } catch (error) {
      console.error('An error occurred while deleting note', error);
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
      file: undefined
    });

    setTimeout(() => document.querySelector<HTMLInputElement>('#title')?.focus(), 100);
  }

  function getFileOnEdit() {
    if(values.file === undefined) {
      return file;
    }
    return values.file;
  }

  function handleViewFile() {
    window.open(`${baseUrl}/storage/files/${getFileOnEdit()?.name}`, '_blank');
  }
  
  return (
    <div className='note position-relative' style={{ backgroundColor: color || '#ffffff' }}>
      <div className={`note-header ${isEditMode ? 'editing' : ''}`}>
        {!isEditMode ? (
          <>
            <h2 className='note-title text-overflow'>{title}</h2>
            <div className='note-icon' onClick={handleToggleFavorite}>
              {is_favorite ? <MdOutlineStar color="#FFA000" size={24}  /> : <MdOutlineStarBorder size={24} />}
            </div>
          </>
        ) : (
          <input 
            type='text' 
            value={values.title} 
            onChange={(e) => setValues({ ...values, title: e.target.value })} 
            id="title"
          />
        )}
      </div>
      <div className={`note-body ${isEditMode ? 'editing' : ''} ${color ? 'border-white' : ''}`}>
        {!isEditMode ? (
          <Fragment>
            <p>{content}</p>
            {file && (
              <div className={`preview-file my-1 mb-2 ${color ? 'with-color' : ''}`} onClick={handleViewFile}>
                <div className="flex align-items gap-1">
                  <BsImages className="preview-icon" />
                  <small>{file.name}</small>
                </div>
              </div>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <textarea
              rows={1}
              ref={textareaRef}
              value={values.content} 
              onChange={(e) => setValues({ ...values, content: e.target.value })}             
              style={{ height: textareaHeight, overflow: "hidden" }}
            />
            {getFileOnEdit() ? (
              <div className="mx-1">
                <div className={`preview-file ${color ? 'with-color' : ''}`}>
                  <div className="flex align-items gap-1">
                    <BsImages className="preview-icon" />
                    <small>
                      {getFileOnEdit()?.name || 'Arquivo sem nome'}
                    </small>
                  </div>
                </div>
                <span className="remove-file" onClick={() => setValues({ ...values, file: null })}>
                  Remover arquivo
                </span>
              </div>
            ) : (
            <div 
              {...getRootProps()} 
              className={`dropzone ${color ? 'with-color' : ''}`}
            >
              <input {...getInputProps()} />
              {
                isDragActive 
                  ? <p>Solte o arquivo aqui...</p>
                  : <p>Arraste arquivo aqui ou clique para selecionar.</p>
              }
            </div>
            )}
          </Fragment>
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
              onChange={(value) => {
                setIsShowingColorPicker(false);
                handleChangeColor(value);
              }}
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
