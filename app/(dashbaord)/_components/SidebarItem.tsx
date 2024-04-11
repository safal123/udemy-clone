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
    pathName === href || pathName.startsWith (href)

  return (
    <Link
      href={ href }
      className={ cn ('flex items-center gap-x-2 m-2 rounded-md text-primary text-sm font-[500]' +
        'black dark:hover:bg-foreground/20',
        isActive && 'bg-foreground/10 dark:bg-primary/20 dark:bg-primary/40 dark:text-primary'
      ) }>
      <div className={ 'flex items-center gap-x-2 p-4 rounded-md' }>
        <Icon size={ 22 } className={ cn ('text-primary') }/>
        { label }
      </div>
    </Link>
  )
}

export default SidebarItem
