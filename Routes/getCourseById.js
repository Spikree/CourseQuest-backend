import express from 'express';
import authenticateToken from '../utils/utils.js';
import courseSchema from '../Schema/courseSchema.js';

const getCourseById = express.Router();

getCourseById.get('/', authenticateToken, async (req, res) => {
    const courseId = req.body.courseId;

    if (!courseId) {
        return res.status(400).json({
            error: true,
            message: "courseId are required"
        })
    }

    try {
        const course = await courseSchema.findById(courseId);

        if(!course) {
            return res.status(400).json({
                error: false,
                message: "course not found"
            });
        }

        return res.status(200).json({
            error: false,
            name: course.name,
            description : course.description,
            price: course.price,
            thumbnailUrl: `${req.protocol}://${req.get('host')}/thumbnails/${video.video}`
        })

    } catch (error) {
        return res.status(400).json({
            error: true,
            message: "internal error fetching the course",
            error
        })
    }
})

export default getCourseById;