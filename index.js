import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'; 
import { fileURLToPath } from 'url';
import createAccount from './Routes/createAccount.js';
import loginAccount from './Routes/loginAccount.js';
import getUser from './Routes/getUser.js';
import uploadVideo from './Routes/uploadVideo.js';
import deleteVideo from './Routes/deleteVideo.js';
import createCourse from './Routes/createCourse.js';
import getAllCoursesByUser from './Routes/getAllCoursesByUser.js';
import getCourseById from './Routes/getCourseById.js';
import getVideos from './Routes/getVideos.js';
import connectDb from './utils/databaseConnect.js';
import getAllCourses from './Routes/getAllCourses.js';
import getVideoById from './Routes/getVideoById.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/videos', express.static(path.join(__dirname, 'uploads')));

app.use('/create-account',createAccount);
app.use('/login-account',loginAccount);
app.use('/get-user',getUser);
app.use('/create-course',createCourse);
app.use('/upload-video', uploadVideo);
app.use('/delete-video', deleteVideo);
app.use('/get-all-courses-user', getAllCoursesByUser);
app.use('/get-course-by-id', getCourseById);
app.use('/get-videos',getVideos);
app.use('/get-video-by-id',getVideoById);
app.use('/get-all-users', getUser);
app.use('/get-all-courses', getAllCourses);


app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
});