import mongoose from "mongoose";

const GroupmsgSchema = new mongoose.Schema({
    groupid: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
    message: { type: String, required: true },
}, { timestamps: true })

const GROUPMSG = new mongoose.model("GroupMessage", GroupmsgSchema);
export default GROUPMSG;