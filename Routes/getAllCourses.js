import express from 'express'
import authenticateToken from '../utils/utils.js';
import courseSchema from '../Schema/courseSchema.js';

const getAllCourses = express.Router();

getAllCourses.get('/', authenticateToken, async (req,res) => {
    try {
        const courses = await courseSchema.find();

        const courseList = courses.map(course => ({
            name: course.name,
            _id: course._id,
            description: course.description,
            price: course.price,
            userId : course.userId,
            courseThumbnail: `${req.protocol}://${req.get('host')}/thumbnails/${course.courseThumbnail}`
        }))

        
        
        res.status(200).json({
            error: false,
            message: "fetched all courses sucessfully",
            courseList
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message:"error fetching all the data"
        })

        console.log(error)
    }
});

export default getAllCourses;