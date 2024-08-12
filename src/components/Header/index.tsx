import React, { useState } from 'react';
import { Search } from '@src/components';
import { INote } from "@src/types/Note";
import { MdOutlineSearch } from "react-icons/md";
import coreNotes from '@src/assets/coreNotes.png';
import "@src/styles/components/_header.scss";

interface IHeaderProps {
  onSearch?: (notes: INote[]) => void;
}

const Header = ({
  onSearch,
}: IHeaderProps) => {
  const [showingSearchOnMobile, setShowingSearchOnMobile] = useState(false);

  return (
    <header className='header'>
      <div className='header-container'>
        <div className="flex items-center flex-1">
          <div className="header-logo mr-3">
            <img src={coreNotes} alt="Cor eNotes logo" />
            <h1>CoreNotes</h1>
          </div>
          <Search
            placeholder="Pesquisar notas"
            onSearch={onSearch}
          />
        </div>
        <MdOutlineSearch 
          size={24} 
          color="#51646E"
          className='header-search-icon'
          onClick={() => setShowingSearchOnMobile(!showingSearchOnMobile)} 
        />
      </div>
      <div className={`header-search-mobile ${showingSearchOnMobile ? 'show' : ''}`}>
        <Search
          className='search-mobile'
          placeholder="Pesquisar notas"
          onSearch={onSearch}
        />
      </div>
    </header>
  );
};

export default Header;
