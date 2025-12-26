import axios from 'axios';
import { TMDB_CONFIG } from '../config/api.config';

const tmdbApi = axios.create({
    baseURL: TMDB_CONFIG.BASE_URL,
    params: {
        api_key: TMDB_CONFIG.API_KEY,
        language: 'en-US'
    }
});

// Получить популярные фильмы
export const getPopularMovies = async (page = 1) => {
    try {
        const response = await tmdbApi.get('/movie/popular', {
            params: { page }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

// Поиск фильмов
export const searchMovies = async (query, page = 1) => {
    try {
        const response = await tmdbApi.get('/search/movie', {
            params: { query, page }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};

// Получить детали фильма
export const getMovieDetails = async (movieId) => {
    try {
        const response = await tmdbApi.get(`/movie/${movieId}`, {
            params: {
                append_to_response: 'videos,credits'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error;
    }
};

// Получить список жанров
export const getGenres = async () => {
    try {
        const response = await tmdbApi.get('/genre/movie/list');
        return response.data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        throw error;
    }
};

// Получить фильмы по жанру
export const getMoviesByGenre = async (genreId, page = 1) => {
    try {
        const response = await tmdbApi.get('/discover/movie', {
            params: {
                with_genres: genreId,
                page,
                sort_by: 'popularity.desc'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching movies by genre:', error);
        throw error;
    }
};

// Получить URL постера
export const getPosterUrl = (posterPath, size = 'poster') => {
    if (!posterPath) {
        return 'https://via.placeholder.com/500x750?text=No+Image';
    }
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.IMAGE_SIZES[size]}${posterPath}`;
};

// Получить URL backdrop
export const getBackdropUrl = (backdropPath) => {
    if (!backdropPath) return null;
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${TMDB_CONFIG.IMAGE_SIZES.backdrop}${backdropPath}`;
};