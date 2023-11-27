import React from 'react';

function Card({ title, image, description, year, artist, onDelete, onUpdate }) {
  return (
    <div className="card mb-3" style={{ width: '18rem' }}>
      <img
        src={image || "default-image-url.png"} // Replace with a default image if `image` is null
        className="card-img-top"
        alt={`Cover for ${title}`}
        style={{ height: '200px', objectFit: 'cover' }} // Ensuring the image is the same size
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {artist && <h6 className="card-subtitle mb-2 text-muted">{artist}</h6>}
        {year && <p className="card-text"><small>Year: {year}</small></p>}
        {description && <p className="card-text"><small> {description}</small></p>}
    
        <button className="btn btn-primary" onClick={onUpdate}>Update</button>
        <button className="btn btn-danger" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
