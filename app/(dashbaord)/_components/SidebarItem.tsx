import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({icon: Icon, label, href}: SidebarItemProps) => {
  const pathName = usePathname ()

  const isActive =
    (pathName === '/' && href === '/') ||
    pathName === href || (pathName.startsWith (href) && href !== '/dashboard')

  return (
    <Link
      href={ href }
      className={ cn ('flex items-center gap-x-2 rounded-md text-sm font-[500] dark:hover:bg-accent/50 hover:bg-gray-100',
        isActive && 'bg-gray-100 text-gray-900 dark:bg-accent/50 dark:text-white'
      ) }>
      <div className={ 'flex items-center gap-x-2 p-3 rounded-md' }>
        <Icon size={ 22 } className={ cn ('') }/>
        { label }
      </div>
    </Link>
  )
}

export default SidebarItem
