import React, { useState } from 'react';

const MovieSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 justify-center p-6">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg focus:outline-none text-neutral-900"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
        Search
      </button>
    </form>
  );
};

export default MovieSearch;
