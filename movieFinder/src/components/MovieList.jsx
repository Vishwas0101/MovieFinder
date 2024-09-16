import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import { fetchMovies } from './Api';
import MovieSearch from './MovieSearch';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState('movie'); // Default search term
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    useEffect(() => {
        const searchMovies = async () => {
            setLoading(true);
            try {
                const data = await fetchMovies(searchTerm, page);

                if (data.movies.length > 0) { // Check if movies were returned
                    setMovies(data.movies);
                    setTotalResults(data.totalResults);
                } else {
                    setError('No movies found.');
                }
            } catch (err) {
                setError('Something went wrong!');
            }
            setLoading(false);
        };

        searchMovies();
    }, [searchTerm, page]);

    const handleSearch = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
        setPage(1); // Reset to first page for new search
    };

    const handleViewDetails = (movieId) => {
        setSelectedMovieId(movieId); // Set the selected movie
    };

    const handleBackToList = () => {
        setSelectedMovieId(null); // Deselect movie to go back to list
    };

    const nextPage = () => setPage(page + 1);
    const prevPage = () => setPage(page > 1 ? page - 1 : 1);

    return (
        <div className="p-6">
            {selectedMovieId ? (
                <MovieDetails movieId={selectedMovieId} onBack={handleBackToList} />
            ) : (
                <>
                    <MovieSearch onSearch={handleSearch} />
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.imdbID} movie={movie} onViewDetails={handleViewDetails} />
                                ))}
                            </div>
                            <div className="flex justify-center space-x-4 mt-6">
                                <button
                                    onClick={prevPage}
                                    disabled={page === 1}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={movies.length === 0} // Disable next if no movies
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default MovieList;
