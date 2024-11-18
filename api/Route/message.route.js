import express from "express";
import { SendMsg } from "../Controller/message.controller.js";

const Msgs = express.Router();

Msgs.post("/sendmsg",SendMsg);

export default Msgs;