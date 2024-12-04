'use client'

import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { ToggleTheme } from '@/components/shared/ToggleTheme'

export const NavbarRoutes = ({showTeacherMode = false, ...props}: {
  showTeacherMode?: boolean
}) => {
  const pathName = usePathname ()
  const isTeacherPage = pathName?.startsWith ('/teacher')
  const isCoursePage = pathName?.includes ('/courses')

  return (
    <div className={ 'flex items-center gap-x-2 ml-auto' } { ...props }>
      { isCoursePage &&
        <Link href={ '/dashboard' }>
          <Button
            size={ 'sm' }
            variant={ 'ghost' }
            className="border border-[#FFD700] text-[#FFD700] bg-[#FFD700] text-black hover:bg-black hover:text-[#FFD700] dark:border-[#FFD700] dark:text-[#FFD700] dark:bg-black dark:hover:bg-[#FFD700] dark:hover:text-black"
          >
            Dashboard
          </Button>
        </Link>
      }
      { showTeacherMode ? (isTeacherPage || isCoursePage) ? (
        <Link href={ '/dashboard' }>
          <Button size={ 'sm' } variant={ 'ghost' }>
            <LogOut className={ 'h-4 w-4 mr-2' }/>
            Exit
          </Button>
        </Link>
      ) : (
        <Link href={ '/teacher/courses' }>
          <Button
            size={ 'sm' }
            variant={ 'outline'}
            className="border border-[#FFD700] text-[#FFD700] bg-[#FFD700] text-black hover:bg-black hover:text-[#FFD700] dark:border-[#FFD700] dark:text-[#FFD700] dark:bg-black dark:hover:bg-[#FFD700] dark:hover:text-black"
          >
            Teacher Dashboard
          </Button>
        </Link>
      ) : ''
      }
      <ToggleTheme/>
      <UserButton afterSignOutUrl={ '/' }/>
    </div>
  )
}
