"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArtist = exports.deleteArtistById = exports.getArtistById = exports.getAllArtists = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'music',
};
const getAllArtists = async () => {
    const connection = await promise_1.default.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM tracks');
    connection.end();
    return rows;
};
exports.getAllArtists = getAllArtists;
const getArtistById = async (artistId) => {
    const connection = await promise_1.default.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM tracks WHERE id = ?', [artistId]);
    connection.end();
    return rows; // Assuming there's only one artist with the given ID
};
exports.getArtistById = getArtistById;
const deleteArtistById = async (artistId) => {
    const connection = await promise_1.default.createConnection(dbConfig);
    await connection.query('DELETE FROM tracks WHERE id = ?', [artistId]);
    connection.end();
};
exports.deleteArtistById = deleteArtistById;
const createArtist = async (artist) => {
    try {
        const connection = await promise_1.default.createConnection(dbConfig);
        const [result] = await connection.execute('INSERT INTO tracks (album_id, title, number, video_url, lyrics) VALUES (?, ?, ?, ?, ?)', [artist.albumId, artist.title, artist.number, artist.videoUrl || null, artist.lyrics || null]);
        connection.end();
        if (result && 'insertId' in result) {
            // The 'insertId' property contains the ID of the newly cnreated artist.
            return result.insertId;
        }
        else {
            console.error('Artist creation failed.');
            return null;
        }
    }
    catch (error) {
        console.error('Error creating artist:', error);
        return null;
    }
};
exports.createArtist = createArtist;
