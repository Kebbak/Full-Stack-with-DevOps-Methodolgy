import { Link } from 'react-router-dom';

export default function MovieCard({ movie, certification = '16', isInMyList, onToggleMyList }) {
  const poster = movie.poster_path || movie.backdrop_path;

  const handleToggle = (e) => {
    e.preventDefault();
    onToggleMyList(movie);
  };

  return (
    <div className="relative min-w-[150px] group">
      <Link to={`/${movie.media_type || 'movie'}/${movie.id}`}>
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w500${poster}`
              : 'https://via.placeholder.com/300x450?text=No+Image'
          }
          alt={movie.title || movie.name}
          className="rounded-lg shadow-md border border-gray-700 hover:border-red-600 hover:scale-105 transition-transform duration-200 w-full h-[225px] object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />

        {/* Age Rating Badge - bottom left */}
        {certification && (
          <div className="absolute bottom-2 left-2 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md z-10">
            {certification}+
          </div>
        )}

        {/* Speaker Icon - bottom right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // handle mute toggle if needed
          }}
          className="absolute bottom-2 right-2 bg-gray-700 border border-white text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md z-10"
        >
          🔇
        </button>

        <h3 className="mt-2 text-center text-white font-semibold truncate">
          {movie.title || movie.name}
        </h3>
      </Link>

      <button
        onClick={handleToggle}
        className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
      >
        {isInMyList ? 'Remove from My List' : 'Add to My List'}
      </button>
    </div>
  );
}
