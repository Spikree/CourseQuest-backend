import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    videoName: {type: String},
    video: {type: String},
    videoDescription : {type: String},
    videoDuration : {type: Number},
    videoNumber : {type: Number},
});

export default mongoose.model("videoSchema", videoSchema);