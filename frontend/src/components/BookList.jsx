import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [select, setSelect] = useState('');
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const FetchBooks = async () => {
      
      try {
        const response = await fetch("http://127.0.0.1:8000/api/books");
        const data = await response.json();
        setBooks(data);

        const uniqueLanguages = [...new Set(data.map((book) => book.language))];
        setLanguages(uniqueLanguages);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    FetchBooks();
  }, []);

  const filteredBooks = select ? books.filter((book) => book.language === select) : books;

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Asmae Books</h1>
        <p className="text-lg text-gray-600">
          Explore books by language.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <select
          value={select}
          onChange={handleSelect}
          className="w-full bg-white border border-gray-300 rounded-lg shadow-sm p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option hidden>Select Language</option>
          {
            languages.map((language, index) => (
                <option key={index} value={language}>{language}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {
          filteredBooks && filteredBooks.map((book) => (
            <Link key={book.id} to={`/books/${book.id}`}>
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-300">
                {book.cover && (
                  <img
                    src={`http://127.0.0.1:8000/${book.cover}`}
                    alt={book.title}
                    className="w-full h-96 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default BookList;
