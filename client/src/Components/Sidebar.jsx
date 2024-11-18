import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='bg-dark-blue h-screen w-12 fixed justify-center flex-row ps-1 pt-12'>
          <Link to="/chat"><i className="ri-chat-1-fill w-10 h-10 pt-1 rounded-lg justify-center flex text-2xl text-white hover:bg-blue-500"></i></Link>
          <Link to="/group"><i className="ri-group-fill w-10 h-10 pt-1 rounded-lg justify-center flex text-2xl text-white hover:bg-blue-500"></i></Link>
         
    </div>
  )
}
