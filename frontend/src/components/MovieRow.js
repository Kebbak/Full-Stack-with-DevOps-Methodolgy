import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function MovieRow({ title, fetchUrl, mockData = null }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (mockData) {
        setMovies(mockData);
        return;
      }

      if (!fetchUrl) return;

      try {
        const res = await fetch(`https://api.themoviedb.org/3${fetchUrl}`);
        if (!res.ok) throw new Error('Failed to fetch movies');
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovies();
  }, [fetchUrl, mockData]);

  if (error) {
    return <p className="text-red-500 px-4">Error: {error}</p>;
  }

  return (
    <div className="mb-10 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-2xl text-white font-bold mb-4">{title}</h2>
      <Slider {...sliderSettings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <Link to={`/movie/${movie.id}`}>
              <div className="relative group">
                <img
                  loading="lazy"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={movie.title || movie.name}
                  className="rounded-lg w-[150px] h-[225px] object-cover bg-gray-800 transition-transform duration-300 group-hover:scale-105"
                />

                {movie.vote_average > 8 && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Top Rated
                  </span>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button className="text-white text-3xl">▶</button>
                </div>

                <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-sm p-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
                  {movie.title || movie.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
