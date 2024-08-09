import { MdOutlineClose } from "react-icons/md";
import { Search } from '@src/components'
import coreNotes from '@src/assets/coreNotes.png'
import './header.scss';

interface IHeaderProps {
  onSearch?: (value: string) => void;
}

const Header = ({
  onSearch,
}: IHeaderProps) => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className="flex items-center">
          <div className="header-logo">
            <img src={coreNotes} alt="CoreNotes logo" />
            <h1>CoreNotes</h1>
          </div>
          <Search 
            className="ml-3" 
            placeholder="Pesquisar notas"
            onSearch={onSearch}
          />
        </div>
        <MdOutlineClose size={24} color="#51646E" />
      </div>
    </header>
  );
};

export default Header;
