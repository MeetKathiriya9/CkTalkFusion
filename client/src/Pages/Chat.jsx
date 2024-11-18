import React from 'react'
import ChatInterface from '../Components/ChatInterface/ChatInterface'
import ChatDashboard from '../Components/ChatDashboard/ChatDashboard';

// const socket = new WebSocket('ws://localhost:3000'); // Replace with your backend WebSocket URL


export default function Chat() {

//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');


//   useEffect(() => {
//     // Fetch users list from backend
//     fetch('/api/users') // Implement an endpoint to fetch users list
//         .then((response) => response.json())
//         .then((data) => setUsers(data));
// }, []);


// // Handle user selection
// const handleUserSelect = (user) => {
//   setSelectedUser(user);
//   // Fetch messages for selected user
//   fetch(`/api/messages/${user.id}`) // Implement an endpoint to fetch messages for a user
//   .then((response) => response.json())
//   .then((data) => setMessages(data));
//   }
//   // Handle message sending
//   const handleSendMessage = () => {};

  return (
    <div className='flex'>
      <ChatInterface></ChatInterface>
      {/* <ChatDashboard className="ms-96"></ChatDashboard> */}
    </div>
  )
}
