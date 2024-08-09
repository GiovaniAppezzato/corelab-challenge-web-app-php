import { useState } from "react";
import { MdOutlineStarBorder, MdOutlineCreate, MdClose } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { INote } from "@src/types/Note";
import { NoteAction } from '@src/components';
import "./note.scss";

interface INoteProps {
  note: INote;  
}

const Note = ({
  note,
}: INoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const { title, content, is_favorite, color } = note;
  const backgroundColor = color || '#fff';
  
  return (
    <div className='note' style={{ backgroundColor }}>
      <div className='note-header'>
        <h2 className='note-title text-overflow'>{title}</h2>
        <div className='note-icon'>
          <MdOutlineStarBorder size={24} />
        </div>
      </div>
      <div className='note-body'>
        <p>{content}</p>
      </div>
      <div className='note-footer'>
        <div className='note-actions'>
          <NoteAction icon={<MdOutlineCreate size={24} />} onClick={() => {}} isActive={true} />
          <NoteAction icon={<RiPaintFill size={24} />} onClick={() => {}} isActive={false} />
        </div>
        <div className='note-actions'> 
          <NoteAction icon={<MdClose size={24} />} onClick={() => {}} isActive={false} />
        </div>
      </div>
    </div>
  );
};

export default Note;
