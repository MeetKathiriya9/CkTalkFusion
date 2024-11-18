import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    gname : {type: String, required: true},
    users: {type: Array, ref: "User"},
    photo: {type: String}
}, {timestamps: true});

const Group = new mongoose.model("Group", groupSchema);
export default Group;
