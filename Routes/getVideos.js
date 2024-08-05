import express from 'express';
import authenticateToken from '../utils/utils.js';
import videoSchema from '../Schema/videoSchema.js';

const getVideos = express.Router();

getVideos.get('/', authenticateToken, async (req, res) => {
    const { courseId } = req.query; 

    if(!courseId) {
        return res.status(400).json({error: true, message : "courseId is required"});
    }

    try {
        const allVideos = await videoSchema.find({courseId});

        if(!allVideos) {
            return res.status(400).json({
                error: true,
                message: "No videos found"
            })
        }

        const allVideoData = allVideos.map(video => ({
            videoName : video.videoName,
            videoDescription : video.videoDescription,
            videoNumber: video.videoNumber,
            videoDuration : video.videoDuration,
            videoUrl: `${req.protocol}://${req.get('host')}/videos/${video.video}`
        }));

        return res.status(200).json({
            error: false,
            message: "fetched all the videos in your course",
            allVideoData
        })
    } catch (error) {
        return res.status(400).json({
            error: true, 
            message: "error fetching videos"
        })
    }
})

export default getVideos;