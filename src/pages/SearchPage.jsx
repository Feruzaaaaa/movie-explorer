import { useState } from 'react';
import { searchMovies } from '../services/tmdbApi';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function SearchPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const handleSearch = async (searchQuery, pageNum = 1) => {
        try {
            setLoading(true);
            setError(null);
            setQuery(searchQuery);
            setSearched(true);

            const data = await searchMovies(searchQuery, pageNum);

            setMovies(pageNum === 1 ? data.results : [...movies, ...data.results]);
            setHasMore(pageNum < data.total_pages);
            setPage(pageNum);
        } catch (err) {
            setError(err.message || 'Failed to search movies');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        handleSearch(query, page + 1);
    };

    return (
        <div className="page">
            <h1>Search Movies</h1>

            <SearchBar
                onSearch={(q) => handleSearch(q, 1)}
                placeholder="Search for movies..."
            />

            {loading && page === 1 && <Loading />}

            {error && <ErrorMessage message={error} />}

            {!loading && searched && movies.length === 0 && (
                <div className="empty-state">
                    <p>No movies found for "{query}"</p>
                    <p>Try a different search term</p>
                </div>
            )}

            {movies.length > 0 && (
                <>
                    <p className="results-count">
                        Found {movies.length} result{movies.length !== 1 ? 's' : ''} for "{query}"
                    </p>

                    <MovieList movies={movies} />

                    {hasMore && (
                        <div className="load-more">
                            <button onClick={handleLoadMore} disabled={loading}>
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </>
            )}

            {!searched && !loading && (
                <div className="empty-state">
                    <p>Start searching for your favorite movies!</p>
                </div>
            )}
        </div>
    );
}