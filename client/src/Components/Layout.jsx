import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Routes from '../Routes/Routers'

export default function Layout() {
  return (
    <>

      <Header></Header>
      <Sidebar></Sidebar>

      <div>
        <Routes></Routes>
      </div>

    </>
  )
}
