import express, { json } from 'express';
import authenticateToken from '../utils/utils.js';
import videoSchema from '../Schema/videoSchema.js';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const unLinkAsync = promisify(fs.unlink);

const deleteVideo = express.Router();

deleteVideo.delete('/:id', authenticateToken, async (req, res) => {
    const videoId = req.params.id;

    if(!videoId) {
        return res.status(400).json({
            message: "please provide video id"
        })
    }

    try {
        const video = await videoSchema.findById(videoId);

        if (!video) {
            return res.status(404).json({
                error: true,
                message: "Video not found"
            });
        }

        const __filename = new URL(import.meta.url).pathname;
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, '..', 'uploads', video.video);

        fs.access(filePath, fs.constants.F_OK, async (err) => {
            if (err) {
                console.error('File does not exist:', filePath);
                return res.status(404).json({
                    error: true,
                    message: "File not found on the server"
                });
            }

            try {
                await unLinkAsync(filePath);
                await videoSchema.findByIdAndDelete(videoId);

                res.json({
                    error: false,
                    message: "Video deleted successfully"
                });
            } catch (error) {
                console.error('Error deleting file or database entry:', error);
                res.status(500).json({
                    error: true,
                    message: 'Error deleting video'
                });
            }
        });
    } catch (error) {
        console.error('Error finding video:', error);
        res.status(500).json({
            error: true,
            message: 'Error processing your request'
        });
    }
})

export default deleteVideo;