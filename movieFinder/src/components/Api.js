import axios from 'axios';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '320cb030'; // Replace with your OMDb API key

// Function to fetch detailed information for a single movie by IMDb ID
export const fetchMovieDetails = async (imdbID) => {
    const response = await axios.get(BASE_URL, {
        params: {
            i: imdbID,
            apiKey: API_KEY
        }
    });
    return response.data;
};

// Function to search movies and fetch their details
export const fetchMovies = async (searchTerm, page = 1) => {
    const searchResponse = await axios.get(BASE_URL, {
        params: {
            s: searchTerm,
            apiKey: API_KEY,
            page: page
        }
    });

    const searchData = searchResponse.data;

    if (searchData.Response === 'True') {
        // For each movie in the search results, fetch its details using imdbID
        const detailedMovies = await Promise.all(
            searchData.Search.map(async (movie) => {
                const details = await fetchMovieDetails(movie.imdbID);
                return details;
            })
        );
        console.log(detailedMovies);


        return {
            totalResults: searchData.totalResults,
            movies: detailedMovies // Returns detailed info for each movie
        };
    } else {
        return {
            totalResults: 0,
            movies: []
        };
    }
};
