import React, { useState, useEffect } from 'react';
import AlbumsComponent from './AlbumsComponent'; // Import your custom AlbumsComponent

import ArtistComponent from './ArtistComponent'; // Import your custom ArtistsComponent

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:5000/api/albums').then(res => res.json()),
      fetch('http://localhost:5000/api/artists').then(res => res.json())
    ])
      .then(([albumsData, artistData]) => {
        setAlbums(albumsData);
        setArtists(artistData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (

    <div className="App">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search albums and artists"
      />
      <AlbumsComponent albums={albums} /> {/* Render your custom AlbumsComponent */}
      <ArtistComponent artists={artists} /> {/* Render your custom ArtistsComponent */}
    </div>
   
  );
}

export default App;
