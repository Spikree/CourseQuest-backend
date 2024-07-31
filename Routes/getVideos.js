import express from 'express';
import authenticateToken from '../utils/utils';

const getVideos = express.Router();

getVideos.get('/', authenticateToken, (req, res) => {
    
})