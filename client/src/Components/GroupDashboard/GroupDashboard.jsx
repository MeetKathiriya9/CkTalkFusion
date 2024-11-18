import React, { useEffect, useRef, useState } from 'react'
import GroupDashboardHeader from './GroupDashboardHeader';
import io from 'socket.io-client';


const socket = io("http://localhost:3000", {
    transports: ["websocket"],
});

const GroupDashboard = ({ group }) => {

    const data = localStorage.getItem("currentUser");
    const CurrentUser = JSON.parse(data);

    const sender = CurrentUser._id;
    const groupid = group._id;

    const [Gmessages, setGMessages] = useState([]);
    const [usersname, setUsersname] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [Readers, setReaders] = useState({});

    const containerRef = useRef(null);

    function generateRandomColor() {
        let maxVal = 0xFFFFFF; // 16777215 in decimal
        let randomNumber = Math.random() * maxVal;
        randomNumber = Math.floor(randomNumber);
        let randomColor = randomNumber.toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    }

    const getusersname = async (id) => {

        if (usersname[id]) return;

        try {
            const res = await fetch(`api/auth/getusersname/${id}`);
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setUsersname((prevUsers) => ({
                ...prevUsers,
                [data.user._id]: {
                    name: data.user.name,
                    color: generateRandomColor(), // Assign unique color
                },
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUsernames = async () => {
            // setUsersname({}); // Reset usernames when group changes

            const uniqueIds = [...new Set(group.users)]; // Avoid duplicate requests
            for (const id of uniqueIds) {
                await getusersname(id);
            }
        };
        fetchUsernames();
    }, [group.users]);

    // const getreaders = async (id) => {
    //     console.log(id);

    //     if (usersname[id]) return;

    //     try {
    //         const res = await fetch(`api/auth/getusersname/${id}`);
    //         const data = await res.json();
    //         if (data.success === false) {
    //             console.log(data.message);
    //             return;
    //         }
    //         console.log(data);

    //         setReaders((prevUsers) => ({
    //             ...prevUsers,
    //             [data.user._id]: {
    //                 name: data.user.name,
    //                 // color: generateRandomColor(), // Assign unique color
    //             },
    //         }));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // // useEffect(() => {
    //     const fetchReaders = async (users) => {
    //         // setUsersname({}); // Reset usernames when group changes
    //         // console.log(users);

    //         const uniqueIds = [...new Set(users)]; // Avoid duplicate requests
    //         for (const id of uniqueIds) {
    //             await getreaders(id);
    //         }
    //     };
    // // }, [group.users]);


    useEffect(() => {
        socket.emit("fetchGroupMessages", groupid);
        const handleLoadGroupMessages = (fetchGMessage) => {
            setGMessages(fetchGMessage);
        };

        const handleReceiveGroupMessage = (message) => {
            setGMessages((prevMessages) => [...prevMessages, message]);
        };

        const handleGroupMessageRead = ({ messageId, userId }) => {


            setGMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg._id === messageId && !msg.readBy.includes(userId)
                        ? { ...msg, readBy: [...msg.readBy, userId] }
                        : msg
                )
            );
        };

        socket.on("loadGroupMessages", handleLoadGroupMessages);
        socket.on("receiveGroupMessage", handleReceiveGroupMessage);
        socket.on("groupMessageRead", handleGroupMessageRead);


        return () => {
            socket.off("loadGroupMessages", handleLoadGroupMessages);
            socket.off("receiveGroupMessage", handleReceiveGroupMessage);
            socket.off("groupMessageRead");
            setGMessages([]); // Clear messages when the group changes

        };
    }, [groupid, socket]);

    const sendMessage = () => {
        // alert("Mahadev");
        if (!newMessage.trim()) return;
        // alert("Mahadev");
        const messageData = {
            message: newMessage,
            sender: sender,
            groupid: groupid
        };
        // alert("Mahadev");
        socket.emit("sendGroupMessage", messageData);
        // alert("Mahadev");

        setNewMessage("");
    };


    const MarkGroupMessageAsRead = () => {

        Gmessages.forEach((msg) => {
            if (!msg.readBy.includes(sender)) {
                socket.emit("markGroupMessageAsRead", { messageId: msg._id, userId: sender });
            }
        })
        // socket.emit("markGroupMessageAsRead",);
        // alert("Mahadev");
    }

    useEffect(() => {
        MarkGroupMessageAsRead();

        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [Gmessages])

    console.log("Gmsg", Gmessages);
    // console.log("msg", Readers);


    return (
        <div className='bg-blue-100 h-full'>
            <GroupDashboardHeader group={group}></GroupDashboardHeader>

            <div>
                <div className='mx-3 overflow-auto h-[566px] scrollbar' ref={containerRef}>
                    {/* <h2>Chat Room</h2> */}
                    <div className={`relative`}>
                        {Gmessages.map((message, index) => {

                            const userColor = usersname[message.sender]?.color || "#CCCCCC"; // Default color
                            const userName = usersname[message.sender]?.name || "Unknown";

                            // const uniqueIds = [...new Set(group.users)]; // Avoid duplicate requests

                            const readerNames = Array.isArray(message.readBy)
                                ? [...new Set( // Use a Set to ensure uniqueness
                                    message.readBy
                                        .map((readerId) => {
                                            const user = usersname[readerId];
                                            return user ? user.name : "Unknown";
                                        })
                                        .filter(Boolean) // Remove any falsy values (like undefined)
                                )].join(", ") // Convert unique names back to a comma-separated string
                                : ""; // If readBy is not an array, fallback to an empty string

                       
                            return (
                                <div key={index} className={` flex ${message.sender == sender ? "justify-end" : "justify-start"}  my-3`}>
                                    <div>
                                        <p className='text-xs mb-1 font-bold' style={{ color: userColor }}>{userName}</p>
                                        <div
                                            className={`py-1 px-3 rounded-md w-fit ${message.sender == sender ? "bg-blue-700 text-white" : "bg-gray-100"}  text-right`}
                                        // style={{ backgroundColor: userColor, color: "white" }}
                                        >
                                            <p>{message.message}</p>
                                            <small className="text-[10px]">
                                                {new Date(message.createdAt).toLocaleTimeString()}

                                                {/* {message.readBy} */}
                                                {/* {Readers} */}
                                                {/* <span className="ml-2 font-bold text-sm text-green-300">hare krishna</span> */}
                                            </small>
                                        </div>
                                        {/* {message.readBy} */}
                                        {readerNames && (
                                            <small className= "text-[10px] text-green-600">
                                                Read by : {readerNames}
                                            </small>
                                        )}
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
    )
}

export default GroupDashboard;