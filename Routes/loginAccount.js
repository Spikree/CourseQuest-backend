import express from 'express'
import jwt from 'jsonwebtoken';
import userSchema from '../Schema/userSchema.js';
import bcrypt from "bcrypt"

const loginAccount = express.Router();

loginAccount.post('/',async(req,res) => {
    const {email, password} = req.body;

    const requiredFields = [email,password];
    const fieldNames = ['email','password'];

    for (let i = 0; i < requiredFields.length; i++) {
        if (!requiredFields[i]) {
            return res.status(400).json({ error: true, message: `${fieldNames[i]} is required` });
        }
    }

    const userInfo = await userSchema.findOne({email: email});

    if(!userInfo) {
        return res.status(400).json({error: true, message: "user not found"});
    }

    const isMatch = await bcrypt.compare(password,userInfo.password);

    if(userInfo.email == email && isMatch) {
        const user = { user: userInfo}
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "36000m",
        })

        return res.json({
            error: false,
            message: "logged in sucessfully",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            message: "invalid password or email"
        })
    }
})

export default loginAccount;