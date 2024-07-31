import express from 'express';
import userSchema from '../Schema/userSchema.js';
import jwt from 'jsonwebtoken';

const createAccount = express.Router();

createAccount.post("/", async (req,res) => {
    const {email,name,password } = req.body;

    const requiredFields = [email,name,password];
    const fieldNames = ['email', 'name', 'password'];

    for (let i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i]) {
            return res.status(400).json({ error: true, message: `${fieldNames[i]} is required` });
        }
    }

    const isUserPresent = await userSchema.findOne({email: email});

    if(isUserPresent) {
        return res.json({
            error: true,
            message: "a user with this email already exists"
        })
    }

    const user = new userSchema({
        name,
        email,
        password
    })

    await user.save();

    const accessToken = jwt.sign({
        user
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m"
    });

    return res.json({
        error: false,
        message: "Account created sucessfully",
        name,
        accessToken
        
    });
})

export default createAccount;