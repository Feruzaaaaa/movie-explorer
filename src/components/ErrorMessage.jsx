export default function ErrorMessage({ message }) {
    return (
        <div className="error-message error-container">
            <span className="error-icon">⚠️</span>
            <h3>Oops! Something went wrong</h3>
            <p>{message || 'An unexpected error occurred. Please try again later.'}</p>
        </div>
    );
}