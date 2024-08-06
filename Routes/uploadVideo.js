import express from 'express'
import authenticateToken from '../utils/utils.js';
import multer from 'multer';
import videoSchema from '../Schema/videoSchema.js';

const uploadVideo = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  });

const upload = multer({
    storage
})


uploadVideo.post('/', authenticateToken,upload.single('video'), async (req,res) => {

  if (!req.file) {
    return res.status(400).json({ error: true, message: "No file selected, video is required" });
  }

  let video = `${req.file.filename}`;
  const videoName = req.body.videoName;
  const videoDescription = req.body.videoDescription;
  const videoDuration = req.body.videoDuration;
  const videoNumber = req.body.videoNumber;
  const courseId = req.body.courseId;


  const newVideo = new videoSchema({
    videoName: videoName,
    video : video,
    videoDescription: videoDescription,
    videoDuration: videoDuration,
    videoNumber : videoNumber,
    courseId : courseId
  })

  const requiredFields = [videoName,video,videoDescription,videoDuration,videoNumber,courseId];
  const reqFieldsNames = ['videoName','video','videoDescription','videoDuration','videoNumber','courseId'];

  for(var i = 0 ; i < requiredFields.length ; i ++) {
    if(!requiredFields[i]) {
      return res.status(400).json({error: true, message: `${reqFieldsNames[i]} is required`})
    }
  }

  try {
    await newVideo.save();
    res.json({
      error: false,
      message: "video saved",
      info: req.file.filename,
      videoId : newVideo._id
    })
  } catch (error) {
    res.json({
      error: true,
      message: "error saving the video",
    })
  }

    // res.status(200).json({
    //     message: "uploaded sucessfully",
    //     info: req.file.filename
    // });

});

export default uploadVideo;