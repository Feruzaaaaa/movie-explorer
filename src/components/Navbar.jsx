import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                🎬 Movie Explorer
            </Link>
            <div className="nav-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                    Home
                </NavLink>
                <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : ''}>
                    Search
                </NavLink>
                <NavLink to="/favorites" className={({ isActive }) => isActive ? 'active' : ''}>
                    Favorites
                </NavLink>
            </div>
        </nav>
    );
}
