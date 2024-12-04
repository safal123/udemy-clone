"use client"

import React, { useState } from 'react'
import MobileSidebar from '@/app/(dashbaord)/_components/MobileSidebar'
import { auth, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ToggleTheme } from '@/components/shared/ToggleTheme'
import { SearchIcon } from 'lucide-react'
import Footer from '@/app/(main)/_components/Footer'

const Layout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  const user = useUser()
  const [search, setSearch] = useState ('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log (search)
  }

  return (
    <div className={ 'min-h-screen' }>
      <div className="h-[80px] fixed w-full top-0 z-50 bg-background dark:bg-black">
        <div className="container mx-auto flex items-center justify-between h-full p-4 space-x-2 px-8">
          <MobileSidebar />
          <div className="hidden lg:flex items-center md:space-x-4">
            <Link href="/" className="text-gray-500">
              <Image src="/logo.svg" alt="logo" width={100} height={100} />
            </Link>
          </div>
          <div className="px-4 hidden md:flex items-center space-x-4 rounded-full shadow-sm border border-primary/40 focus-within:border-primary">
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              placeholder="Search courses"
              className="px-4 py-2 w-96 rounded-full focus:outline-none bg-transparent"
            />
            <SearchIcon className="cursor-pointer w-6 h-6" />
          </div>
          <div className="flex items-center space-x-2">
            <ToggleTheme />
            {user.isSignedIn ? (
              <div className="flex items-center justify-between space-x-4">
                <Link href="/dashboard" className="hidden md:block">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center justify-between space-x-4">
                <Link href="/sign-in">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm">Join Now</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="border-t md:hidden px-8 w-full h-[70px] flex items-center space-x-4 shadow-sm border-b bg-white dark:bg-black">
          <input
            type="text"
            placeholder="Search courses"
            className="py-2 w-full focus:outline-none bg-transparent"
          />
          <SearchIcon className="cursor-pointer w-6 h-6" />
        </div>
      </div>

      <div className={ 'mt-[150px] md:mt-[80px]' }>
        { children }
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
