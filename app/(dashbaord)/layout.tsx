import React from 'react'
import Sidebar from '@/app/(dashbaord)/_components/Sidebar'
import MobileSidebar from '@/app/(dashbaord)/_components/MobileSidebar'
import { NavbarRoutes } from '@/components/shared/NavbarRoutes'
import { auth } from '@clerk/nextjs'

export const revalidate = 0

const DashboardLayout = ({children}: {
  children: React.ReactNode
}) => {
  return (
    <div className={ 'h-full' }>
      <div className={ 'h-[80px] lg:pl-56 fixed w-full inset-y-0 z-50' }>
        <div className={ 'flex items-center justify-between h-full p-4 border-b bg-white dark:bg-black shadow-sm' }>
          <MobileSidebar/>
          <NavbarRoutes/>
        </div>
      </div>
      <div className={ 'h-full hidden lg:flex w-72 fixed inset-y-0 z-50' }>
        <Sidebar/>
      </div>
      <main className={ 'lg:pl-72 pt-[80px]' }>
        { children }
      </main>
    </div>
  )
}

export default DashboardLayout
