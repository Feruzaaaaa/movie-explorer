import { useState, useEffect } from 'react';
import { getPopularMovies, getMoviesByGenre } from '../services/tmdbApi';
import MovieList from '../components/MovieList';
import FilterGenres from '../components/FilterGenres';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMovies(1, true);
    }, [selectedGenre]);

    const loadMovies = async (pageNum, reset = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = selectedGenre
                ? await getMoviesByGenre(selectedGenre, pageNum)
                : await getPopularMovies(pageNum);

            setMovies(prev => reset ? data.results : [...prev, ...data.results]);
            setHasMore(pageNum < data.total_pages);
            setPage(pageNum);
        } catch (err) {
            setError(err.message || 'Failed to load movies');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        loadMovies(page + 1);
    };

    const handleGenreSelect = (genreId) => {
        setSelectedGenre(genreId);
        setPage(1);
    };

    if (loading && page === 1) {
        return <Loading />;
    }

    if (error && page === 1) {
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="page">
            <h1>{selectedGenre ? 'Movies by Genre' : 'Popular Movies'}</h1>

            <FilterGenres
                selectedGenre={selectedGenre}
                onSelectGenre={handleGenreSelect}
            />

            <MovieList movies={movies} />

            {hasMore && (
                <div className="load-more">
                    <button onClick={handleLoadMore} disabled={loading}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </div>
    );
}
