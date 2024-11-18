import mongoose from 'mongoose';
import React, { useEffect, useState } from 'react'

const GroupDashboardHeader = ({ group }) => {
    // console.log(group);
    

    const [usersname, setUsersname] = useState({});
    // const [cg, setcg] = useState();

    
    // useEffect(()=>{
    //     if(cg != group){
    //         setcg(group);
    //     }
    //     setcg((prevgroup) => ({
    //         ...prevgroup,
    //         group
    //     }));
      
    // },[group])

    


    const getusersname = async (id) => {
        try {
            const res = await fetch(`api/auth/getusersname/${id}`);

            const data = await res.json();
            if (data.success == false) {
                console.log(data.message);
                return;
            }
            setUsersname((prevUsers) => ({
                ...prevUsers,
                [data.user._id]: data.user.name, // Cache username by ID
            }));

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchUsernames = async () => {

            setUsersname({})
            const uniqueIds = [...new Set(group.users)]; // Avoid duplicate requests
            for (const id of uniqueIds) {
                await getusersname(id);
            }
        };
        if (group.users) fetchUsernames();
    }, [group.users]);

    return (
        <div className='bg-blue-200 w-[1104px] py-2 px-4 border-b-2 border-b-dark-blue flex items-center'>
            <img src={group.photo} alt="profile img" className='w-12 h-12 rounded-full' />
            <div>
                <p className='text-dark-blue font-medium ms-3'>{group.gname}</p>

                <div className='flex'>
                    {
                        Object.entries(usersname).map(([id, name]) => (
                            <p key={id} className='text-dark-blue font-medium ms-3'>{name},</p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default GroupDashboardHeader;