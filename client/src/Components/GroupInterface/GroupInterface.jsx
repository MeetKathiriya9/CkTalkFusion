import React, { useEffect, useState } from 'react'
import GroupInterfaceHeader from './GroupInterfaceHeader';
import GroupDashboard from '../GroupDashboard/GroupDashboard';
// import ChatInterfaceHeader from './ChatInterfaceHeader'
// import ChatDashboard from '../ChatDashboard/ChatDashboard';
import { fetchAPI } from '../../utils/api.js';



export default function GroupInterface() {


    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const data = localStorage.getItem("currentUser");
    // const CurrentUser = JSON.parse(data);


    useEffect(() => {
        // alert("call");
        const fetchUsers = async () => {
            try {
                const response = await fetchAPI("api/group/getgroups");

                const data = await response.json();
                // const arraydata = Object.values(data);

                if (data.success === false) {
                    console.log(data);
                    return;
                }
                setGroups(data.data);  // Set the users to state
                // console.log(data.data["0"]);

            } catch (err) {
                setError('Failed to load users');
                console.error('Error fetching users:', err);

            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, []);


    const getGroupID = async (group) => {
        console.log(group);
        
        setGroup(group);
    }

    return (
        <div className='flex overflow-hidden'>


            <div className='bg-blue-200 w-96 h-[681px] ms-12 border-e-2 border-e-dark-blue'>

                <GroupInterfaceHeader></GroupInterfaceHeader>

                {loading && <div>Loading users...</div>}
                {error && <div>{error}</div>}

                <div className='mt-8 mx-5 overflow-auto h-[573px] scroll-smooth scrollbar'>
                
                    {groups.map((group, index) => (
                        <div key={index} className='my-2 flex hover:bg-blue-300 py-2 px-2 rounded-lg items-center' onClick={()=>getGroupID(group)}>
                            <img src={group.photo} alt="user profile" className='w-12 h-12 rounded-full' />

                            <div className='ms-3'>
                                <p className='text-dark-blue font-bold text-lg'>{group.gname}</p>
                                {/* <p className="">{group.users}</p> */}
                            </div>

                        </div>
                    ))}
                </div>


            </div>

            <div>
                {group && <GroupDashboard group={group} />}
            </div>


        </div>
    )

}




