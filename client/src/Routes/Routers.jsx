import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from '../Pages/Chat'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import Group from '../Pages/Group'

export default function Routers() {
  return (
    <>
      
        <Routes>
            <Route path='/chat' element={<Chat></Chat>}></Route>    
            <Route path='/group' element={<Group></Group>}></Route>    
            <Route path='/register' element={<Register></Register>}></Route>    
            <Route path='/' element={<Login></Login>}></Route>    
        </Routes>  
        
    </>
  )
}
