import { MdOutlineSearch } from "react-icons/md";

interface ISearchProps {
  placeholder?: string;
  type?: string;
  loading?: boolean;
  className?: string;
}

const Search = ({
  loading = false,
  type = "text",
  className = "",
  ...rest
}: ISearchProps) => {
  return (
    <div className={`search ${className}`}>
      <input className="search-input" type={type} {...rest} />
      {!loading ? <MdOutlineSearch className="search-icon" size={22} /> : null}
    </div>
  );
};

export default Search;
