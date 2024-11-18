import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

  const data = localStorage.getItem("currentUser");
  const CurrentUser = JSON.parse(data);

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  }

  // useEffect(()=>{
  //   window.location.reload();
  // },[logout])
  
  return (
    <div className='bg-dark-blue h-12 w-full pt-0 px-14 flex justify-between items-center'>
      <h1 className=' text-2xl font-bold text-white '>TalkFusion</h1>

      <p className=' text-md font-bold text-white '>{CurrentUser ? CurrentUser.name : "name"} <Link to="/" className='bg-red-700 pt-1 pb-2 px-3 rounded-full' onClick={logout}>Logout</Link></p>
    </div>
  )
}
