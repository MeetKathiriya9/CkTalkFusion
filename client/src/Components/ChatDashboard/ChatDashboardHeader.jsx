import React, { useEffect, useState } from 'react'

const ChatDashboardHeader = ({ receiver }) => {

  // console.log("receiver", receiver);

  const [receiverUser, setReceiverUser] = useState([]);


  useEffect(() => {
    if (receiver) {
      const otheruser = Object.values(receiver);
      setReceiverUser(otheruser);
      console.log("ar", otheruser);
    }
  }, [receiver]);

  return (
    <div className='bg-blue-200 w-[1104px] py-2 px-4 border-b-2 border-b-dark-blue flex items-center'>
      <img src={receiverUser["5"]} alt="profile img" className='w-12 h-12 rounded-full' />
      <p className='text-dark-blue font-medium ms-3'>{receiverUser["1"]}</p>
    </div>
  )
}

export default ChatDashboardHeader;