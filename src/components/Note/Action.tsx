import './note.scss';

interface IActionProps {
  onClick?: () => void;
  icon: JSX.Element;
  isActive?: boolean;
}

const Action = ({
  onClick,
  icon,
  isActive = false,
  ...rest
}: IActionProps) => {
  return (
    <button className={`note-action ${isActive ? 'active' : ''}`} onClick={onClick} {...rest}>
      {icon}
    </button>
  );
};

export default Action;
