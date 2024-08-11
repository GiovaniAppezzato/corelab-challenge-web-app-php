import { useState, useEffect } from "react";
import { MdOutlineSearch } from "react-icons/md";
import NotesService from "@src/services/Notes";
import { INote } from "@src/types/Note";
import "./search.scss";

interface ISearchProps {
  onSearch?: (notes: INote[]) => void;
  placeholder?: string;
  className?: string;
}

const Search = ({
  onSearch = () => {},
  className = "",
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
    }, 500);

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
        className="search-input" 
        type="text" {...rest}
        value={searchTitle}
        onChange={onChange}
      />
      {!loading ? <MdOutlineSearch className="search-icon" size={22} /> : null}
    </div>
  );
};

export default Search;
