import { MdOutlineSearch } from "react-icons/md";
import "./search.scss";

interface ISearchProps {
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Search = ({
  onSearch = () => {},
  className = "",
  ...rest
}: ISearchProps) => {
  const loading = false;
  
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    console.log(value);
  }

  return (
    <div className={`search ${className}`}>
      <input className="search-input" type="text" {...rest} />
      {!loading ? <MdOutlineSearch className="search-icon" size={22} /> : null}
    </div>
  );
};

export default Search;
