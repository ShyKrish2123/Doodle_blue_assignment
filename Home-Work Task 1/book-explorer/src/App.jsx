import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [totalBooks, setTotalBooks] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchBooks(searchText, currentPage, limit) {
    setLoading(true);
    setError("");
    setBooks([]);
    setTotalBooks(0);

    try {
      const params = new URLSearchParams({
        q: searchText || "fiction",
        page: String(currentPage),
        limit: String(limit),
        fields: "key,title,author_name,first_publish_year,cover_i",
      });

      const response = await fetch(
        `https://openlibrary.org/search.json?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          `Request failed (${response.status}). Please try again.`
        );
      }

      const data = await response.json();

      setBooks(data.docs || []);
      setTotalBooks(data.num_found || 0);
    } catch (err) {
      if (err instanceof TypeError) {
        setError(
          "Network error. Please check your internet connection."
        );
      } else {
        setError(
          err.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks(query, page, booksPerPage);
  }, [query, page, booksPerPage]);

  function handleSearch(event) {
    event.preventDefault();

    const newQuery = search.trim();

    if (newQuery === query && page === 1) {
      fetchBooks(newQuery, 1, booksPerPage);
      return;
    }

    setPage(1);
    setQuery(newQuery);
  }

  function retryRequest() {
    fetchBooks(query, page, booksPerPage);
  }

  const totalPages = Math.ceil(totalBooks / booksPerPage);

  function previousPage() {
    if (page > 1 && !loading) {
      setPage((currentPage) => currentPage - 1);
    }
  }

  function nextPage() {
    if (page < totalPages && !loading) {
      setPage((currentPage) => currentPage + 1);
    }
  }

  function handlePageSizeChange(event) {
    setBooksPerPage(Number(event.target.value));
    setPage(1);
  }

  return (
    <div className="app">
      <header className="header">
        <h1> Book Explorer</h1>
        <p>Discover your next favourite book.</p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by book title or author..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search books by title or author"
        />

        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      <main className="content">
        {/* Loading state */}
        {loading && (
          <div className="message loading" role="status">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="message error" role="alert">
            <h2>Oops! Something went wrong.</h2>
            <p>{error}</p>

            <button type="button" onClick={retryRequest}>
              Try Again
            </button>
          </div>
        )}

        {/* No results state */}
        {!loading && !error && books.length === 0 && (
          <div className="message empty">
            <h2> No books found</h2>
            <p>Try another book title or author name.</p>
          </div>
        )}

        {/* Book results */}
        {!loading && !error && books.length > 0 && (
          <>
            <div className="results-info">
              <p>
                Showing page {page} of {totalPages}
              </p>

              <div className="results-controls">
                <label htmlFor="booksPerPage">
                  Books per page:
                </label>

                <select
                  id="booksPerPage"
                  value={booksPerPage}
                  onChange={handlePageSizeChange}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                </select>

                <span>
                  {totalBooks.toLocaleString()} books found
                </span>
              </div>
            </div>

            <div className="book-grid">
              {books.map((book, index) => {
                const coverUrl = book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : null;

                return (
                  <article
                    className="book-card"
                    key={book.key || `${book.title}-${index}`}
                  >
                    {coverUrl ? (
                      <img
                        className="book-cover"
                        src={coverUrl}
                        alt={`Cover of ${book.title || "Untitled book"}`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="cover-placeholder">
                        <span className="placeholder-icon">📖</span>
                        <span>No Cover Available</span>
                      </div>
                    )}

                    <div className="book-info">
                      <h2>{book.title || "Untitled"}</h2>

                      <p>
                        <strong>Author:</strong>{" "}
                        {book.author_name?.join(", ") ||
                          "Unknown author"}
                      </p>

                      <p>
                        <strong>First published:</strong>{" "}
                        {book.first_publish_year || "Unknown"}
                      </p>

                      {book.key && (
                        <a
                          href={`https://openlibrary.org${book.key}`}
                          target="_blank"
                          rel="noreferrer"
                          className="details-link"
                        >
                          View Book ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination controls */}
            <div className="pagination">
              <button
                type="button"
                onClick={previousPage}
                disabled={page <= 1 || loading}
              >
                ← Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                onClick={nextPage}
                disabled={page >= totalPages || loading}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
