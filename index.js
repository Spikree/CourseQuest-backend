import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import createAccount from './Routes/createAccount.js';
import mongoose from 'mongoose';
import loginAccount from './Routes/loginAccount.js';
import getUser from './Routes/getUser.js';
import uploadVideo from './Routes/uploadVideo.js';
import deleteVideo from './Routes/deleteVideo.js';
import createCourse from './Routes/createCourse.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log("connected to db")
    } catch (error) {
        console.log("Error connecting to db", error)
    }
}

connectDb();

app.use('/create-account',createAccount);
app.use('/login-account',loginAccount);
app.use('/get-user',getUser);
app.use('/upload-video', uploadVideo);
app.use('/delete-video', deleteVideo);
app.use('create-course',createCourse);

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});