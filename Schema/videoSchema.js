import mongoose from "mongoose";
const schema = mongoose.Schema

const videoSchema = schema ({
    videoName: {type: String},
    video: {type: String},
    videoDescription : {type: String},
    videoDuration : {type: Number},
    videoNumber : {type: Number},
    courseId : {type: schema.Types.ObjectId}
});

export default mongoose.model("videoSchema", videoSchema);