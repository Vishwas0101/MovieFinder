import React from 'react';

const MovieCard = ({ movie, onViewDetails }) => {

    const renderStarRating = (rating) => {
        const starCount = Math.round(rating / 2); // IMDb ratings are out of 10, convert to 5
        const stars = [];

        // Generate filled stars
        for (let i = 0; i < starCount; i++) {
            stars.push(<span key={i} className="text-yellow-500">★</span>);
        }

        // Generate empty stars to complete the 5 stars
        for (let i = starCount; i < 5; i++) {
            stars.push(<span key={i} className="text-gray-500">☆</span>);
        }

        return stars;
    };

    return (
        <div className="max-w-sm bg-neutral-100 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                className="w-full h-64 object-cover"
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.Title}
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{movie.Title}</h2>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Released Year: {movie.Year}</span>
                </div>
                <div className="mt-2  text-gray-900">
                    <span className="font-semibold">Rating: </span>
                    {movie.imdbRating ? renderStarRating(movie.imdbRating) : 'N/A'}
                </div>
                <p className="text-sm text-gray-700 mt-4 line-clamp-3">
                    {movie.Plot ? movie.Plot : 'No synopsis available.'}
                </p>
            </div>
            <div className="p-4 bg-gray-100">
                <button
                    onClick={() => onViewDetails(movie.imdbID)}
                    className="text-sm text-blue-500 hover:underline"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
