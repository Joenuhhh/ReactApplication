import React, { useState } from 'react';
import Card from './Card';

function AlbumsComponent({ albums, onDeleteAlbum, onUpdateAlbum }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter albums based on the searchTerm
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search albums"
            className="form-control mb-3"
          />
        </div>
        {filteredAlbums.map(album => (
          <div key={album.id} className="col-md-4 d-flex align-items-stretch">
            <Card
              title={album.title}
              image={`https://picsum.photos/seed/${album.title}/200`}
              description={album.description}
              year={album.year}
              artist={album.artist}
              onDelete={() => onDeleteAlbum(album.id)}
              onUpdate={() => onUpdateAlbum(album.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumsComponent;
