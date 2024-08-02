import express from 'express'
import authenticateToken from '../utils/utils.js';
import courseSchema from '../Schema/courseSchema.js';

const getAllCoursesByUser = express.Router();

getAllCoursesByUser.get('/',authenticateToken, async (req,res) => {
    const userId = req.user.user._id;

    if(!userId) {
        return res.status(400).json({
            error: true,
            message : "user id is required"
        });
    };

    try {
        const allCourses = await courseSchema.find({userId});

        if(!allCourses || allCourses.length == 0) {
            return res.status(400).json({
                error: false,
                message : "No courses found for this user"
            });
        }

        const coursesData = allCourses.map(course => ({
            name: course.name,
            description : course.description,
            price : course.price,
            createdAt : course.createdAt
        }))

        return res.status(200).json({
            error: false,
            coursesData
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            message : "error finding courses",
        });
    }
});

export default getAllCoursesByUser;