"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbum = exports.deleteAlbumById = exports.getAlbumById = exports.getAllAlbums = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'music',
};
const getAllAlbums = async () => {
    const connection = await promise_1.default.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM albums');
    connection.end();
    return rows;
};
exports.getAllAlbums = getAllAlbums;
const getAlbumById = async (albumId) => {
    const connection = await promise_1.default.createConnection(dbConfig);
    const [rows] = await connection.query('SELECT * FROM albums WHERE id = ?', [albumId]);
    connection.end();
    return rows; // Assuming there's only one album with the given ID
};
exports.getAlbumById = getAlbumById;
const deleteAlbumById = async (albumId) => {
    const connection = await promise_1.default.createConnection(dbConfig);
    await connection.query('DELETE FROM albums WHERE id = ?', [albumId]);
    connection.end();
};
exports.deleteAlbumById = deleteAlbumById;
const createAlbum = async (album) => {
    try {
        const connection = await promise_1.default.createConnection(dbConfig);
        const [result] = await connection.execute('INSERT INTO albums (title, artist, year, image, description) VALUES (?, ?, ?, ?, ?)', [album.title, album.artist, album.releaseYear, album.imageUrl, album.description]);
        connection.end();
        if (result && 'insertId' in result) {
            // The 'insertId' property contains the ID of the newly created album.
            return result.insertId;
        }
        else {
            console.error('Album creation failed.');
            return null;
        }
    }
    catch (error) {
        console.error('Error creating album:', error);
        return null;
    }
};
exports.createAlbum = createAlbum;
