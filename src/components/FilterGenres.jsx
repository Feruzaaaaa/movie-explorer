import { useState, useEffect } from 'react';
import { getGenres } from '../services/tmdbApi';

export default function FilterGenres({ onSelectGenre, selectedGenre }) {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGenres();
    }, []);

    const loadGenres = async () => {
        try {
            const data = await getGenres();
            setGenres(data);
        } catch (error) {
            console.error('Failed to load genres');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading genres...</div>;

    return (
        <div className="genre-filter">
            <button
                className={`genre-btn ${!selectedGenre ? 'active' : ''}`}
                onClick={() => onSelectGenre(null)}
            >
                All
            </button>
            {genres.map(genre => (
                <button
                    key={genre.id}
                    className={`genre-btn ${selectedGenre === genre.id ? 'active' : ''}`}
                    onClick={() => onSelectGenre(genre.id)}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}
