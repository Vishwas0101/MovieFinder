import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from './Api';

const MovieDetails = ({ movieId, onBack }) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    useEffect(() => {
        const getMovieDetails = async () => {
            setLoading(true);
            try {
                const data = await fetchMovieDetails(movieId);
                if (data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError('Something went wrong!');
            }
            setLoading(false);
        };

        getMovieDetails();
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">Back</button>
            <div className="flex flex-col md:flex-row">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={movie.Title}
                    className="w-full md:w-1/3 object-cover rounded-lg"
                />
                <div className="md:ml-6">
                    <h1 className="text-2xl font-bold mt-4 md:mt-0 text-neutral-900">{movie.Title}</h1>
                    <p className="text-neutral-600">Released: {movie.Released}</p>
                    <div className="mt-2  text-gray-900">
                        <span className="font-semibold">Rating: </span>
                        {movie.imdbRating ? renderStarRating(movie.imdbRating) : 'N/A'}
                    </div>                    <p className="mt-4 text-neutral-600">{movie.Plot}</p>
                    <ul className="mt-4 text-neutral-600">
                        <li><strong>Director:</strong> {movie.Director}</li>
                        <li><strong>Actors:</strong> {movie.Actors}</li>
                        <li><strong>Genre:</strong> {movie.Genre}</li>
                        <li><strong>Runtime:</strong> {movie.Runtime}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
