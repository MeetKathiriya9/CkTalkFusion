import React, { useEffect, useState } from 'react'
import ChatInterfaceHeader from './ChatInterfaceHeader'
import ChatDashboard from '../ChatDashboard/ChatDashboard';
// import { fetchAPI } from '../../utils/api.js';
const apiUrl = import.meta.env.VITE_API_URL;
import { fetchAPI } from '../../utils/api.js';



export default function ChatInterface() {

  const [users, setUsers] = useState([]);
  const [otheruser, setOtherUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const data = localStorage.getItem("currentUser");
  // const CurrentUser = JSON.parse(data);


  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const response = await fetchAPI("api/auth/getusers")

        const data = await response.json();
        const arraydata = Object.values(data);

        if (data.success === false) {
          console.log(data);
          return;
        }
        setUsers(arraydata["0"]); // Set the users to state
        // console.log(arraydata["0"]);
         

      } catch (err) {
        setError('Failed to load users');
        console.error('Error fetching users:', err);

      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  }, []);


  const getOtherUserID = async (user) => {
    setOtherUser(user);
  }
  
  return (
    <div className='flex overflow-hidden'>


      <div className='bg-blue-200 w-96 h-[681px] ms-12 border-e-2 border-e-dark-blue'>

        <ChatInterfaceHeader></ChatInterfaceHeader>

        {loading && <div>Loading users...</div>}
        {error && <div>{error}</div>}

        <div className='mt-8 mx-5 overflow-auto h-[573px] scroll-smooth scrollbar'>

          {users.map((user, index) => (
            <div key={index} className='my-2 flex hover:bg-blue-300 py-2 px-2 rounded-lg' onClick={() => getOtherUserID(user)}>
              <img src={user.photo} alt="user profile" className='w-12 h-12 rounded-full' />

              <div className='ms-3'>
                <p className='text-dark-blue font-bold text-lg'>{user.name}</p>
                <p className="">{user.email}</p>
              </div>

            </div>
          ))}
        </div>


      </div>

      <div>
        {otheruser && <ChatDashboard receiver={otheruser} />}
      </div>


    </div>
  )
}
