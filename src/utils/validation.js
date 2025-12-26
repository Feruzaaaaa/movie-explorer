export const validateNote = (note) => {
    const trimmedNote = note.trim();

    if (trimmedNote.length < 5) {
        return {
            isValid: false,
            error: 'Note must be at least 5 characters long'
        };
    }

    if (trimmedNote.length > 500) {
        return {
            isValid: false,
            error: 'Note must be less than 500 characters'
        };
    }

    return {
        isValid: true,
        error: null
    };
};

// Форматирование даты
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Форматирование времени
export const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};
```

### `src/hooks/useMovies.js`
```javascript
import { useState, useEffect } from 'react';
import { getPopularMovies, getMoviesByGenre } from '../services/tmdbApi';

export const useMovies = (genreId = null) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadMovies(1, true);
    }, [genreId]);

    const loadMovies = async (pageNum, reset = false) => {
        try {
            setLoading(true);
            setError(null);

            const data = genreId
                ? await getMoviesByGenre(genreId, pageNum)
                : await getPopularMovies(pageNum);

            setMovies(prev => reset ? data.results : [...prev, ...data.results]);
            setHasMore(pageNum < data.total_pages);
            setPage(pageNum);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            loadMovies(page + 1);
        }
    };

    return { movies, loading, error, hasMore, loadMore };
};