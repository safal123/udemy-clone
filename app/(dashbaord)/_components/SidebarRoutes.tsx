'use client'

import {
  BarChart,
  Compass,
  DollarSign,
  ImageIcon,
  Layout,
  List,
  LogInIcon,
  Settings,
  UserIcon,
  VideoIcon
} from 'lucide-react'
import SidebarItem from '@/app/(dashbaord)/_components/SidebarItem'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'


const studentRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/dashboard',
    key: 'home'
  },
  {
    icon: UserIcon,
    label: 'Profile',
    href: '/dashboard/profile',
    key: 'profile'
  },
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
    key: 'courses'
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
    key: 'analytics'
  },
  {
    icon: VideoIcon,
    label: 'Videos',
    href: '/teacher/videos',
    key: 'videos'
  },
  {
    icon: ImageIcon,
    label: 'Images',
    href: '/teacher/images',
    key: 'images'
  }
]

const guestRoutes = [
  {
    icon: LogInIcon,
    label: 'Login',
    href: '/sign-in',
    key: 'login'
  },
  {
    icon: UserIcon,
    label: 'Sign up',
    href: '/sign-up',
    key: 'signup'
  }
]


export const SidebarRoutes = () => {
  const pathName = usePathname ()
  const isTeacherPage = pathName?.startsWith ('/teacher')
  const {user} = useUser ()

  const routes = user ? isTeacherPage ? teacherRoutes : studentRoutes : guestRoutes

  return (
    <div className={ 'flex flex-col w-full p-3 border-t gap-1' }>
      { routes.map ((route) => (
        <SidebarItem
          icon={ route.icon }
          label={ route.label }
          href={ route.href }
          key={ route.key }
        />
      )) }
    </div>
  )
}
