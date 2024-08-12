import { ReactNode } from 'react';
import '@src/styles/components/_button.scss';

interface IButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  loading?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  children,
  loading = false,
  className = '',
  ...rest
}: IButtonProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick} {...rest}>
      {loading ? 'Carregando...' : children}
    </button>
  );
};

export default Button;
