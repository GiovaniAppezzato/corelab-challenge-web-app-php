import { ReactNode } from 'react';
import './button.scss';

interface IButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  loading?: boolean;
}

const Action = ({
  onClick,
  children,
  loading = false,
  ...rest
}: IButtonProps) => {
  return (
    <button className={`button`} onClick={onClick} {...rest}>
      {loading ? 'Carregando...' : children}
    </button>
  );
};

export default Action;
