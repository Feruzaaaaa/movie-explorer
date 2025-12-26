import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, deleteFavorite } from '../services/favoritesApi';
import { getPosterUrl } from '../services/tmdbApi';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            setLoading(true);
            const data = await getFavorites();
            setFavorites(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load favorites');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this movie from favorites?')) return;

        try {
            await deleteFavorite(id);
            setFavorites(favorites.filter(fav => fav.id !== id));
        } catch (err) {
            alert('Failed to remove favorite');
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    if (favorites.length === 0) {
        return (
            <div className="page empty-state">
                <h1>My Favorites</h1>
                <p>You haven't added any favorites yet</p>
                <Link to="/" className="btn-primary">
                    Browse Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>My Favorites ({favorites.length})</h1>

            <div className="favorites-grid">
                {favorites.map(favorite => (
                    <div key={favorite.id} className="favorite-card">
                        <img
                            src={getPosterUrl(favorite.poster)}
                            alt={favorite.title}
                            className="favorite-poster"
                        />

                        <div className="favorite-info">
                            <h3>{favorite.title}</h3>

                            <div className="favorite-meta">
                                <span className="rating">
                                    ⭐ {favorite.rating?.toFixed(1)}
                                </span>
                                <span className="date">
                                    Added {new Date(favorite.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            {favorite.note && (
                                <div className="favorite-note">
                                    <strong>My Note:</strong>
                                    <p>{favorite.note}</p>
                                </div>
                            )}

                            <div className="favorite-actions">
                                <Link to={`/movie/${favorite.movieId}`} className="btn-primary">
                                    View Details
                                </Link>
                                <button
                                    onClick={() => handleDelete(favorite.id)}
                                    className="btn-danger"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
