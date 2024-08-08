import { ReactNode } from "react";
import { Search } from '@src/components'
import { MdOutlineClose } from "react-icons/md";
import coreNotes from '@src/assets/coreNotes.png'

interface IHeaderProps {
  children?: ReactNode;
}

const Header = (props: IHeaderProps) => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className="flex items-center">
          <div className="header-logo">
            <img src={coreNotes} alt="CoreNotes logo" />
            <h1>CoreNotes</h1>
          </div>
          <Search placeholder="Pesquisar notas" className="ml-3" />
        </div>
        <MdOutlineClose size={24} color="#51646E" />
      </div>
    </header>
  );
};

export default Header;
