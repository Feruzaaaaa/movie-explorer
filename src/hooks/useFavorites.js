import { useState, useEffect } from 'react';
import { getFavorites, addFavorite, updateFavorite, deleteFavorite, checkIfFavorite } from '../services/favoritesApi';

export const useFavorites = () => {
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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const add = async (movie, note) => {
        try {
            const newFavorite = await addFavorite(movie, note);
            setFavorites(prev => [...prev, newFavorite]);
            return newFavorite;
        } catch (err) {
            throw new Error('Failed to add favorite');
        }
    };

    const update = async (id, note) => {
        try {
            const updated = await updateFavorite(id, note);
            setFavorites(prev => prev.map(fav => fav.id === id ? updated : fav));
            return updated;
        } catch (err) {
            throw new Error('Failed to update favorite');
        }
    };

    const remove = async (id) => {
        try {
            await deleteFavorite(id);
            setFavorites(prev => prev.filter(fav => fav.id !== id));
        } catch (err) {
            throw new Error('Failed to remove favorite');
        }
    };

    const isFavorite = async (movieId) => {
        return await checkIfFavorite(movieId);
    };

    return {
        favorites,
        loading,
        error,
        add,
        update,
        remove,
        isFavorite,
        refresh: loadFavorites
    };
};