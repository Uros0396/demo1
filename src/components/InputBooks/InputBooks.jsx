import { useContext } from "react";
//import fantasy from "../books/fantasy.json";
import { SearchContext } from "../SearchContext/SearchContext";

const InputBooks = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /*const filteredBooks = searchTerm
      ? fantasy.filter((book) =>
          book?.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];*/

  return (
    <div>
      <input
        type="text"
        placeholder="Search Book"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputBooks;
