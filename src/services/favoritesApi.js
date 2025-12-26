import axios from 'axios';
import { MOCK_API_URL } from '../config/api.config';

const favoritesApi = axios.create({
    baseURL: `${MOCK_API_URL}/favorites`
});

// Получить все избранные фильмы
export const getFavorites = async () => {
    try {
        const response = await favoritesApi.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

// Добавить фильм в избранное
export const addFavorite = async (movie, note) => {
    try {
        const response = await favoritesApi.post('/', {
            movieId: movie.id,
            title: movie.title,
            poster: movie.poster_path,
            note: note,
            rating: movie.vote_average,
            createdAt: new Date().toISOString()
        });
        return response.data;
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

// Обновить заметку в избранном
export const updateFavorite = async (id, note) => {
    try {
        const response = await favoritesApi.put(`/${id}`, { note });
        return response.data;
    } catch (error) {
        console.error('Error updating favorite:', error);
        throw error;
    }
};

// Удалить из избранного
export const deleteFavorite = async (id) => {
    try {
        await favoritesApi.delete(`/${id}`);
    } catch (error) {
        console.error('Error deleting favorite:', error);
        throw error;
    }
};

// Проверить, есть ли фильм в избранном
export const checkIfFavorite = async (movieId) => {
    try {
        const favorites = await getFavorites();
        return favorites.find(fav => fav.movieId === movieId);
    } catch (error) {
        console.error('Error checking favorite:', error);
        return null;
    }
};