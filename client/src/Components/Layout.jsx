import React from 'react'
import Routes from '../Routes/routes'
import Header from './Header'
import Sidebar from './Sidebar'

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
