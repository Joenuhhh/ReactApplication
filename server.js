// server.js

const express = require('express');
const cors = require('cors'); 
const albumServices = require('./public/services/albumService');
const artistServices = require('./public/services/artistService')
const app = express();

app.use(express.json()); // For parsing application/json
// server.js continued
app.use(cors());
// Get all albums
app.get('/api/albums', async (req, res) => {
    try {
      const albums = await albumServices.getAllAlbums();
      res.json(albums);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // Get an album by ID
  app.get('/api/albums/:id', async (req, res) => {
    try {
      const album = await albumServices.getAlbumById(req.params.id);
      res.json(album);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // Get all tracks
app.get('/api/artists', async (req, res) => {
    try {
      const tracks = await artistServices.getAllArtists();
      res.json(tracks);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

// Get a track by ID
app.get('/api/artists/:id', async (req, res) => {
    try {
      const track = await artistServices.getArtistById(req.params.id);
      res.json(track);
    } catch (error) {
      res.status(500).send(error.message);
    }
});
// Add a POST endpoint for creating a new album
app.post('/api/albums', async (req, res) => {
    try {
      const newAlbum = req.body; // Get the new album data from the request body
      const albumId = await albumServices.createAlbum(newAlbum); // Call the createAlbum function
      if (albumId) {
        res.json({ success: true, id: albumId }); // Send a success response with the newly created album ID
      } else {
        res.status(500).send('Failed to create album'); // Send an error response if creation fails
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
// Add a POST endpoint for creating a new track
app.post('/api/artists', async (req, res) => {
    try {
      const newArtist = req.body; // Get the new track data from the request body
      const trackId = await artistServices.createArtist(newArtist) // Call the createTrack function
      if (trackId) {
        res.json({ success: true, id: trackId }); // Send a success response with the newly created track ID
      } else {
        res.status(500).send('Failed to create track'); // Send an error response if creation fails
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.delete('/api/albums/:id', async (req, res) => {
    try {
      const albumId = req.params.id; // Get the album ID from the URL parameters
      await albumServices.deleteAlbumById(albumId); // Call the deleteAlbumById function
      res.json({ success: true, message: 'Album deleted successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  // Delete an artist by ID
app.delete('/api/artists/:id', async (req, res) => {
    try {
      const artistId = req.params.id; // Get the artist ID from the URL parameters
      await artistServices.deleteArtistById(artistId); // Call the deleteArtistById function (you need to implement this in your artist service)
      res.json({ success: true, message: 'Artist deleted successfully' });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  