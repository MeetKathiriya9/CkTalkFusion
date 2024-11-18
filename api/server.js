import express from 'express'
import dotenv from 'dotenv';
import Auth from './Route/auth.route.js';
import Msgs from './Route/message.route.js';
import mongoose from 'mongoose';
import cors from 'cors';

import http from 'http'
import { Server } from 'socket.io'
import MSG from './Model/message.model.js';
import GroupR from './Route/group.route.js';
import GroupMessages from './Route/groupmessage.route.js';
import GROUPMSG from './Model/groupmsg.model.js';
import { log } from 'console';

dotenv.config();

// console.log(process.env.DB_URL);
// mongoose.connect(process.env.DB_URL).then(()=>{
//     console.log("Connected to MongoDB");
// }).catch(()=>{
//     console.log("Failed to connect to MongoDB");
// });

mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Failed to connect to MongoDB:", err.message);
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(express.json());

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: ['GET', 'POST'], // Allow these methods
    credentials: true
}));



app.use("/api/auth", Auth);
app.use("/api/msg", Msgs);
app.use("/api/group", GroupR);
app.use("/api/groupmsg", GroupMessages);


io.on("connection", (socket) => {
    console.log("A user conneted: ", socket.id);

    socket.on("fetchMessages", async (ids) => {
        try {
            const senderId = ids["0"];
            const receiverId = ids["1"];

            const messages = await MSG.find({
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId }
                ]
            }).sort({ createdAt: -1 }).limit(50);
            socket.emit("loadMessages", messages.reverse());

            console.log("msgs", messages);

        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    });

    socket.on("sendMessage", async (messageData) => {
        try {
            const message = new MSG(messageData);
            await message.save();

            // Broadcast the new message to all connected clients
            io.emit("receiveMessage", message);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });



    socket.on("fetchGroupMessages", async (groupid) => {
        console.log("gid", groupid);
        try {

            const messages = await GROUPMSG.find({ groupid }).sort({ createdAt: -1 }).limit(50);
            socket.emit("loadGroupMessages", messages.reverse());

            console.log("msgs", messages);

        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    });

    socket.on("sendGroupMessage", async (messageData) => {
        try {
            const message = new GROUPMSG(messageData);
            await message.save();

            // Broadcast the new message to all connected clients
            io.emit("receiveGroupMessage", message);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on("markAsRead", async (data) => {
        const { messageId } = data;

        try {
            await MSG.findByIdAndUpdate(messageId, { isRead: true })

            socket.broadcast.emit("messageRead", { messageId });
        } catch (error) {
            console.error("Error marketing message as read: ", error);
        }
    });

    socket.on("markGroupMessageAsRead", async ({ messageId, userId }) => {
        try {
            const message = await GROUPMSG.findById(messageId);

            if(!message.readBy.includes(userId)){
                message.readBy.push(userId);
                await message.save();
            }

            io.emit("groupMessageRead", { messageId, userId });

        } catch (error) {
            console.error("Error marking group message as read:", error);
        }
    })

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);

    });
});


server.listen(3000, () => {
    console.log("3000 port is running");
})