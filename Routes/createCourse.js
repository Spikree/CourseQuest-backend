import express from "express";
import authenticateToken from "../utils/utils.js";
import courseSchema from "../Schema/courseSchema.js";
import multer from "multer";

const createCourse = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'thumbnails')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '-' + uniqueSuffix);
  }
});

const upload = multer({
  storage
})

createCourse.post("/", authenticateToken,upload.single('courseThumbnail'), async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ error: true, message: "No file selected" });
  }

  let courseThumbnail = req.file.filename
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const userId = req.user.user._id;
 

  const requiredFields = [name, description, price, userId, courseThumbnail];
  const fieldNames = ["name", "description", "price", "userId","courseThumbnail"];

  for (let i = 0; i < requiredFields.length; i++) {
    if (!requiredFields[i]) {
      return res
        .status(400)
        .json({ error: true, message: `${fieldNames[i]} is required` });
    }
  }

  const course = new courseSchema({
    name,
    description,
    price,
    userId,
    courseThumbnail,
  });

  try {
    await course.save();
    res
      .status(200)
      .json({ error: false, message: "course created sucessfully", name });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "error saving the data",
    });
  }
});

export default createCourse;
