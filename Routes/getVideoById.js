import express, { json } from 'express'
import authenticateToken from '../utils/utils.js';
import videoSchema from '../Schema/videoSchema.js';

const getVideoById = express.Router();

getVideoById.get('/',authenticateToken,async(req,res) => {
    const {videoId} = req.query; 

    if(!videoId) {
        return res.status(400).json({message: "videoId is required"});
    }

    try {
        const video = await videoSchema.findById(videoId);

        if(!video) {
            return res.status(400).json({message: "video not found"});
        }

        return res.status(200).json({
            videoName : video.videoName,
            videoDescription : video.videoDescription,
            videoNumber: video.videoNumber,
            videoUrl: `${req.protocol}://${req.get('host')}/videos/${video.video}`
        })
    } catch (error) {
        return res.status(400).json({
            message: "internal error fetching the video"
        });
    }
});

export default getVideoById;