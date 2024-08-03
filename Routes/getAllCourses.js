import express from 'express'
import authenticateToken from '../utils/utils.js';
import courseSchema from '../Schema/courseSchema.js';

const getAllCourses = express.Router();

getAllCourses.get('/', authenticateToken, async (req,res) => {
    try {
        const courses = await courseSchema.find();
        res.status(200).json({
            error: false,
            message : "fetched all the courses",
            courses
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