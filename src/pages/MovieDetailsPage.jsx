import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getPosterUrl, getBackdropUrl } from '../services/tmdbApi';
import { addFavorite, checkIfFavorite, deleteFavorite, updateFavorite } from '../services/favoritesApi';
import FavoriteForm from '../components/FavoriteForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function MovieDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorite, setFavorite] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadMovie();
        checkFavoriteStatus();
    }, [id]);

    const loadMovie = async () => {
        try {
            setLoading(true);
            const data = await getMovieDetails(id);
            setMovie(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to load movie details');
        } finally {
            setLoading(false);
        }
    };

    const checkFavoriteStatus = async () => {
        const fav = await checkIfFavorite(parseInt(id));
        setFavorite(fav);
    };

    const handleAddFavorite = async (note) => {
        try {
            setSubmitting(true);
            await addFavorite(movie, note);
            await checkFavoriteStatus();
            setShowForm(false);
        } catch (err) {
            alert('Failed to add to favorites');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateFavorite = async (note) => {
        try {
            setSubmitting(true);
            await updateFavorite(favorite.id, note);
            await checkFavoriteStatus();
            setShowForm(false);
        } catch (err) {
            alert('Failed to update favorite');
        } finally {
            setSubmitting(false);
        }
    };

    const handleRemoveFavorite = async () => {
        if (!window.confirm('Remove from favorites?')) return;

        try {
            await deleteFavorite(favorite.id);
            setFavorite(null);
            setShowForm(false);
        } catch (err) {
            alert('Failed to remove from favorites');
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!movie) return <ErrorMessage message="Movie not found" />;

    const trailer = movie.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    const director = movie.credits?.crew?.find(person => person.job === 'Director');

    return (
        <div className="movie-details">
            {movie.backdrop_path && (
                <div className="backdrop">
                    <img src={getBackdropUrl(movie.backdrop_path)} alt={movie.title} />
                </div>
            )}

            <div className="movie-content">
                <button onClick={() => navigate(-1)} className="back-button">
                    ← Back
                </button>

                <div className="movie-header">
                    <img
                        src={getPosterUrl(movie.poster_path)}
                        alt={movie.title}
                        className="movie-poster"
                    />

                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        {movie.tagline && <p className="tagline">{movie.tagline}</p>}

                        <div className="movie-meta">
                            <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                            <span>•</span>
                            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                            <span>•</span>
                            <span>{movie.runtime} min</span>
                        </div>

                        <div className="genres">
                            {movie.genres?.map(genre => (
                                <span key={genre.id} className="genre-tag">{genre.name}</span>
                            ))}
                        </div>

                        <div className="overview">
                            <h2>Overview</h2>
                            <p>{movie.overview || 'No overview available.'}</p>
                        </div>

                        {director && (
                            <p className="director">
                                <strong>Director:</strong> {director.name}
                            </p>
                        )}

                        <div className="favorite-actions">
                            {favorite ? (
                                <>
                                    <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                                        ✏️ Edit Note
                                    </button>
                                    <button onClick={handleRemoveFavorite} className="btn-danger">
                                        🗑️ Remove from Favorites
                                    </button>
                                </>
                            ) : (
                                <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                                    ❤️ Add to Favorites
                                </button>
                            )}
                        </div>

                        {showForm && (
                            <div className="favorite-form-container">
                                <FavoriteForm
                                    initialNote={favorite?.note || ''}
                                    onSubmit={favorite ? handleUpdateFavorite : handleAddFavorite}
                                    onCancel={() => setShowForm(false)}
                                    isEditing={!!favorite}
                                />
                            </div>
                        )}

                        {favorite && !showForm && (
                            <div className="current-note">
                                <strong>Your Note:</strong>
                                <p>{favorite.note}</p>
                            </div>
                        )}
                    </div>
                </div>

                {trailer && (
                    <div className="trailer-section">
                        <h2>Trailer</h2>
                        <iframe
                            width="100%"
                            height="500"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="Movie Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}

                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <div className="cast-section">
                        <h2>Top Cast</h2>
                        <div className="cast-grid">
                            {movie.credits.cast.slice(0, 6).map(actor => (
                                <div key={actor.id} className="cast-card">
                                    <img
                                        src={actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                            : 'https://via.placeholder.com/185x278?text=No+Photo'
                                        }
                                        alt={actor.name}
                                    />
                                    <p className="actor-name">{actor.name}</p>
                                    <p className="character-name">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
