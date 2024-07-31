import express from 'express';
import authenticateToken from '../utils/utils.js';
import courseSchema from '../Schema/courseSchema.js';

const createCourse = express.Router();

createCourse.post('/',authenticateToken,async(req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const userId = req.user._id;

    const requiredFields = [name, description, price, userId];
    const fieldNames = ["name", "description", "price", "userId"];

    for (let i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i]) {
            return res.status(400).json({ error: true, message: `${fieldNames[i]} is required` });
        }
    }

    const course = new courseSchema({
        name,
        description,
        price,
        userId
    });

    try {
        await course.save();
        return res.status(200).json({error: false, message: "cource created sucessfully", courseName});
    } catch (error) {
        res.status(400).json({
            error: true,
            message:"error saving the data"
        })
    }
});

export default createCourse;