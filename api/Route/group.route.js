import express from "express";
import { createGroup, getGroups } from "../Controller/group.controller.js";

const GroupR = express.Router();

GroupR.post("/creategroup",createGroup);
GroupR.get("/getgroups",getGroups);

export default GroupR;