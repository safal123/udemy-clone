import React from 'react'
import MobileSidebar from '@/app/(dashbaord)/_components/MobileSidebar'
import { auth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ToggleTheme } from '@/components/shared/ToggleTheme'
import { SearchIcon } from 'lucide-react'
import Footer from '@/app/(main)/_components/Footer'

const Layout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  const {userId} = auth ()
  return (
    <div className={ 'min-h-screen bg-background' }>
      <div className={ 'h-[80px] fixed w-full inset-y-0 z-50 bg-background shadow-lg' }>
        <div className={ 'flex items-center justify-between h-full p-4 border-b shadow-sm lg:px-16 space-x-2' }>
          <MobileSidebar/>
          <div className={ 'hidden lg:flex items-center md:space-x-4' }>
            <Link href={ '/' } className={ 'text-gray-500' }>
              <Image src="/logo.svg" alt="logo" width={ 100 } height={ 100 }/>
            </Link>
          </div>
          <div className={ 'px-4 hidden md:flex items-center space-x-4 bg-background rounded-full shadow-sm border focus-within:border-primary' }>
            <input
              type={ 'text' }
              placeholder={ 'Search courses' }
              className={ 'px-4 py-2 w-96 rounded-full focus:outline-none bg-transparent' }
            />
            <SearchIcon className={ 'cursor-pointer w-6 h-6' }/>
          </div>
          <div className={ 'flex items-center space-x-2' }>
            <ToggleTheme/>
            { userId ?
              <div className={ 'flex items-center justify-between space-x-4' }>
                <Link href={ '/dashboard' } className={ 'hidden md:block' }>
                  <Button variant={ 'outline' }>
                    Dashboard
                  </Button>
                </Link>
                <UserButton afterSignOutUrl={ '/' }/>
              </div>
              :
              <div className={ 'flex items-center justify-between space-x-4' }>
                <Link href={ '/sign-in' }>
                  <Button variant={ 'outline' } size={ 'sm' }>
                    Login
                  </Button>
                </Link>
                <Link href={ '/sign-up' }>
                  <Button variant={ 'outline' } size={ 'sm' }>
                    Sign up
                  </Button>
                </Link>
              </div>
            }
          </div>
        </div>
        <div className={ 'md:hidden px-4 w-full h-[70px] flex items-center space-x-4 bg-gray-100 shadow-sm border-b' }>
          <input
            type={ 'text' }
            placeholder={ 'Search courses' }
            className={ 'py-2 w-full focus:outline-none bg-transparent' }
          />
          <SearchIcon className={ 'cursor-pointer w-6 h-6' }/>
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
