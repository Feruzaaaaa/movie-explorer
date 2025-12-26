import { Link } from 'react-router-dom';
import { getPosterUrl } from '../services/tmdbApi';

export default function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
            <div className="movie-poster-container">
                <img
                    src={getPosterUrl(movie.poster_path)}
                    alt={movie.title}
                    className="movie-poster"
                />
                <div className="movie-overlay">
                    View Details
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                    <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span className="year">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </span>
                </div>
            </div>
        </Link>
    );
}
