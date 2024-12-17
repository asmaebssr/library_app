import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBook();
  }, [id]);

  let description = book.description || '';

  if (!showFullDescription) {
    description = description.substring(0, 90) + '...' ;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col sm:flex-row gap-6">
        {book.cover && (
          <div className="flex-shrink-0 w-full sm:w-1/3">
            <img
              src={`http://127.0.0.1:8000/${book.cover}`}
              alt={book.title}
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        )}

        <div className="flex-grow">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </p>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-semibold">Language:</span> {book.language}
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">{description}</p>
            <button onClick={ () => setShowFullDescription( (prevState) => !prevState ) } className="text-indigo-500 hover:text-indigo-600">{showFullDescription ? 'Less' : 'More'}</button>
            <br />
            {book.pdf && (
            <a
              href={`http://127.0.0.1:8000/${book.pdf}`}
              download
              className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Download PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
