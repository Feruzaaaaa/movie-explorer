import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = "Search movies..." }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button">
                🔍 Search
            </button>
        </form>
    );
}
