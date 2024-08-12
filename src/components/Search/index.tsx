import { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import NotesService from "@src/services/Notes";
import { INote } from "@src/types/Note";
import "@src/styles/components/_search.scss";

interface ISearchProps {
  onSearch?: (notes: INote[]) => void;
  placeholder?: string;
  className?: string;
  showingSearchOnMobile?: boolean;
  setShowingSearchOnMobile?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search = ({
  showingSearchOnMobile,
  setShowingSearchOnMobile,
  className = "",
  onSearch = () => {},
  ...rest
}: ISearchProps) => {
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const handler = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await NotesService.getNotes({ title: searchTitle });
        onSearch(response.data.data);
      } catch (error) {
        console.error("An error occurred while searching notes", error);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(handler);
    }
  }, [searchTitle]);
  
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchTitle(value);
  }

  return (
    <div className={`search ${className}`}>
      <input 
        className="search-input flex-1" 
        type="text" {...rest}
        value={searchTitle}
        onChange={onChange}
      />
      {!loading 
        ? <MdOutlineSearch className="search-icon" size={22} /> 
        : <div className="loading-wrapper"><FaSpinner className="animate-spin" size={22} /></div>}
    </div>
  );
};

export default Search;
