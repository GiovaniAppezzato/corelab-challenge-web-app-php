import { ReactNode } from 'react';
import '@src/styles/components/_alert.scss';

interface IAlertProps {
  children?: ReactNode;
  className?: string;
}

const Alert = ({
  children,
  className = '',
}: IAlertProps) => {
  return (
    <div className={`alert ${className}`}>
      {children}
    </div>
  );
};

export default Alert;
