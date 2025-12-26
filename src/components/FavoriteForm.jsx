import { useState } from 'react';

export default function FavoriteForm({
    initialNote = '',
    onSubmit,
    onCancel,
    isEditing = false
}) {
    const [note, setNote] = useState(initialNote);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (note.trim().length < 5) {
            setError('Note must be at least 5 characters long');
            return;
        }

        if (note.trim().length > 500) {
            setError('Note must be less than 500 characters');
            return;
        }

        setError('');
        onSubmit(note.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="favorite-form">
            <h3>{isEditing ? 'Edit Note' : 'Add to Favorites'}</h3>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a note about this movie... (min 5 characters)"
                className="favorite-textarea"
                rows="4"
            />
            <div className="character-count">
                {note.length} / 500 characters
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="form-actions">
                <button type="submit" className="btn-primary">
                    {isEditing ? 'Update' : 'Add to Favorites'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="btn-secondary">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
