import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
