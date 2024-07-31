import mongoose from "mongoose";

const { Schema } = mongoose;

const courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: 'userSchema'},
    // videos: {type: Schema.Types.ObjectId, ref: 'videoSchema'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("courseSchema", courseSchema);
