import { ReactNode } from 'react';
import './alert.scss';

interface IButtonProps {
  children?: ReactNode;
  className?: string;
}

const Action = ({
  children,
  className = '',
}: IButtonProps) => {
  return (
    <div className={`alert ${className}`}>
      {children}
    </div>
  );
};

export default Action;
