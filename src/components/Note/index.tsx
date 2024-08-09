import { useState } from "react";
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineCreate, MdClose } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { INote } from "@src/types/Note";
import { NoteAction } from '@src/components';
import NotesService from "@src/services/Notes";
import "./note.scss";

interface INoteProps {
  note: INote;
  onEdit?: (note: INote) => void;
}

const Note = ({
  note,
  onEdit
}: INoteProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const { id, title, content, is_favorite, color } = note;
  const backgroundColor = color || '#fff';

  async function handleToggleFavorite() {
    try {
      await NotesService.toggleFavorite(id);
    } catch (error) {
      console.error('An error occurred while toggling favorite', error);
    }
  }
  
  return (
    <div className='note' style={{ backgroundColor }}>
      <div className='note-header'>
        <h2 className='note-title text-overflow'>{title}</h2>
        <div className='note-icon'>
          {is_favorite ? <MdOutlineStar color="#FFA000" size={24} /> : <MdOutlineStarBorder size={24} />}
        </div>
      </div>
      <div className='note-body'>
        <p>{content}</p>
      </div>
      <div className='note-footer'>
        <div className='note-actions'>
          <NoteAction 
            icon={<MdOutlineCreate size={24} />} 
            onClick={() => setIsEdit(!isEdit)} 
            isActive={isEdit} 
          />
          <NoteAction 
            icon={<RiPaintFill size={24} />}
            onClick={handleToggleFavorite} 
            isActive={false} 
          />
        </div>
        <div className='note-actions'> 
          <NoteAction icon={<MdClose size={24} />} onClick={() => {}} isActive={false} />
        </div>
      </div>
    </div>
  );
};

export default Note;
