import React, { useState, useEffect, useRef } from 'react';
import ChatDashboardHeader from './ChatDashboardHeader';
import io from 'socket.io-client';

import { fetchAPI } from '../../utils/api.js';

// const socket = io("http://localhost:3000");

const socket = io("https://cktalkfusion-backend.onrender.com", {
    transports: ["websocket"],
});
const ChatDashboard = ({ receiver }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [receiverUser, setReceiverUser] = useState([]);
    const [usernames, setUsernames] = useState({}); // Store usernames mapped by user ID
    const [isSend, setisSend] = useState(false);

    const containerRef = useRef(null);

    const data = localStorage.getItem("currentUser");
    const CurrentUser = JSON.parse(data);

    const sender = CurrentUser._id;
    const receiverid = receiverUser["0"];

    const ids = [sender, receiverid];

    useEffect(() => {
        if (receiver) {
            const otheruser = Object.values(receiver);
            setReceiverUser(otheruser);
        }
    }, [receiver]);

    useEffect(() => {

        if (sender && receiverid) {
            socket.emit("fetchMessages", ids);
        }

        socket.on("loadMessages", (fetchedMessages) => {
            setMessages(fetchedMessages);
        })

        socket.on("receiveMessage", (message) => {
            if (
                (message.sender === sender && message.receiver === receiverid) ||
                (message.sender === receiverid && message.receiver === sender)
            ) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        socket.on("messageRead", ({ messageId }) => {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === messageId ? { ...msg, isRead: true } : msg
                )
            );
        });

        return () => {
            socket.off("loadMessages")
            socket.off("receiveMessage")
            socket.off("messageRead");

        };
    }, [sender, receiverid]);

    const sendMessage = () => {
        // alert("Mahadev");
        setisSend(true);
        if (!newMessage.trim()) return;
        // alert("Mahadev");
        const messageData = {
            message: newMessage,
            sender: sender,
            receiver: receiverid
        };
        // alert("Mahadev");
        socket.emit("sendMessage", messageData);
        // alert("Mahadev");
        setisSend(false);
        setNewMessage("");
    };


    const markMessagesAsRead = () => {
        messages.forEach((msg) => {
            if (!msg.isRead && msg.sender !== sender) {
                socket.emit("markAsRead", { messageId: msg._id });
            }
        });
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        markMessagesAsRead();

    }, [messages])


    const getUsername = async (id) => {

        if (!usernames[id]) {  // Only fetch if the username isn’t already in state
            try {
                const res = await fetchAPI(`api/auth/getusersname/${id}`);
                const data = await res.json();

                if (data.success == false) {
                    console.error("Error fetching username:", data.user.message);
                } else {
                    setUsernames((prevUsernames) => ({
                        ...prevUsernames,
                        [id]: data.user.name,  // Update state with new username
                    }));
                }

            } catch (error) {
                console.error("Error at getUsername:", error);
            }
        }
    }



    return (
        <div className='bg-blue-100 h-full'>
            <ChatDashboardHeader receiver={receiver}></ChatDashboardHeader>

            <div>
                <div className='mx-3 overflow-auto h-[566px] scrollbar' ref={containerRef}>
                    {/* <h2>Chat Room</h2> */}
                    <div className={`relative`}>
                        {messages.map((message, index) => {
                            getUsername(message.sender);
                            return (
                                <div key={index} className={` flex ${message.sender == sender ? "justify-end" : "justify-start"} my-2`}>
                                    <div
                                        className={`py-1 px-4 rounded-3xl w-fit ${message.sender == sender ? "bg-blue-600 text-white text-right" : "bg-gray-100 text-left"
                                            }`}
                                    >
                                        <p>{message.message}</p>
                                        <small className="text-[10px]">
                                            {new Date(message.createdAt).toLocaleTimeString()}

                                            {!isSend ? <>
                                                {message.sender == sender && message.isRead && <span className="ml-2 font-bold text-sm text-green-300">✓✓ </span>}
                                                {message.sender == sender && !message.isRead && <span className="ml-2 font-bold text-sm text-green-300">✓ </span>}
                                            </> : <>
                                                {message.sender == sender && <span className="ml-2 font-bold text-sm text-gray-300"><i className="ri-time-line"></i> </span>}

                                            </>}

                                            {/* {message.sender == sender && message.isRead && <span className="ml-2 font-bold text-sm text-green-300">✓✓ </span>}
                                            {message.sender == sender && !message.isRead && <span className="ml-2 font-bold text-sm text-green-300">✓ </span>} */}
                                        </small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                <div className='flex border-t-dark-blue border-t-2 bottom-0 fixed w-full px-2'>
                    <input
                        className='bg-transparent py-3 w-[64%] outline-none'
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage} className='w-32 bg-blue-300' type='submit'><i className="ri-send-plane-2-fill text-dark-blue font-semibold text-xl"></i></button>

                </div>

            </div>
        </div>
    );
}

export default ChatDashboard;