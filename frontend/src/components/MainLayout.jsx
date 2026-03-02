import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div className='flex'>
      <LeftSidebar/>
      <div className='flex-1 w-full ml-[16%]'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout