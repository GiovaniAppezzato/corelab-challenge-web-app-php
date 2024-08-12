import "@src/styles/components/_note.scss";

interface IActionProps {
  onClick?: () => void;
  icon: JSX.Element;
  isActive?: boolean;
  className?: string;
}

const NoteAction = ({
  onClick,
  icon,
  isActive = false,
  className = '',
  ...rest
}: IActionProps) => {
  return (
    <button className={`note-action ${className} ${isActive ? 'active' : ''}`} onClick={onClick} {...rest}>
      {icon}
    </button>
  );
};

export default NoteAction;
