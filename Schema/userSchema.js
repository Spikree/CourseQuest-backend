import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {type: String},
    name: {type: String},
    password: {type: String}
})

export default mongoose.model("userSchema", userSchema);