import React from 'react'
import MobileSidebar from '@/app/(dashbaord)/_components/MobileSidebar'
import { auth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ToggleTheme } from '@/components/shared/ToggleTheme'

const Layout =
  ({
     children
   }: Readonly<{ children: React.ReactNode }>) => {
    const {userId} = auth ()
    return (
      <div className={ 'min-h-screen bg-background' }>
        <div className={ 'h-[80px] fixed w-full inset-y-0 z-50 bg-background' }>
          <div
            className={ 'flex items-center justify-between h-full p-4 border-b shadow-sm lg:px-16' }>
            <MobileSidebar/>
            <div className={ 'hidden md:flex items-center space-x-4' }>
              <Link href={ '/' } className={ 'text-gray-500' }>
                <Image src="/logo.svg" alt="logo" width={ 100 } height={ 100 }/>
              </Link>
            </div>
            <div className={ 'flex items-center space-x-2' }>
              <ToggleTheme/>
              { userId ?
                <div className={ 'flex items-center justify-between space-x-4' }>
                  <Link href={ '/dashboard' }>
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
        </div>
        <div className={ 'mt-[80px]' }>
          { children }
        </div>
      </div>
    )
  }

export default Layout
