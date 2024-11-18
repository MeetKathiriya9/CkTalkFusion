import express from "express";
import { sendGmsg } from "../Controller/groupmessage.controller.js";

const GroupMessages = express.Router();

GroupMessages.post("/groupsendmsg",sendGmsg);

export default GroupMessages;