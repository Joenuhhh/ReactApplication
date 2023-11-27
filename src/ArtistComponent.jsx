import React from 'react';
import Card from './Card';



function ArtistsComponent({ artists, onDeleteArtist, onUpdateArtist }) {
    return (
      <div className="container">
        <div className="row">
          {artists.map((artist, index) => ( // index is used as a fallback key
            <div key={artist.id || index} className="col-md-4 d-flex align-items-stretch">
              <Card
                title={artist.title}
                image={`https://picsum.photos/seed/${encodeURIComponent(artist.title)}/200`}
           
                year={artist.number} // Assuming 'number' is a unique identifier like a year or a track number
                artist={`Album ID: ${artist.album_id}`} // Displaying album ID as part of the artist's additional info
                description={artist.lyrics}
    
                videoUrl={artist.video_url} // Passing video URL if it exists
                onDelete={() => onDeleteArtist(artist.id)}
                onUpdate={() => onUpdateArtist(artist.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
}

export default ArtistsComponent;
