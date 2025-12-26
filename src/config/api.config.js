export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
    API_KEY: process.env.REACT_APP_TMDB_API_KEY,
    IMAGE_SIZES: {
        poster: 'w500',
        backdrop: 'original'
    }
};
export const MOCK_API_URL = 'https://693837b4618a71d77cf68c6.mockapi.io/api/v1';