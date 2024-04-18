'use client'

import { CheckCircle, Lock, PlayCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CourseSidebarItemProps {
  label: string;
  chapterId: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
}

export const CourseSidebarItem =
  ({
     label,
     chapterId,
     isCompleted,
     courseId,
     isLocked = true
   }: CourseSidebarItemProps) => {
    const pathname = usePathname ()
    const router = useRouter ()

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
    const isActive = pathname?.includes (chapterId)

    const onClick = () => {
      router.push (`/courses/${ courseId }/chapters/${ chapterId }`)
    }

    return (
      <button
        onClick={ onClick }
        type="button"
        className={ cn (
          'w-full flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all',
          isActive && 'bg-slate-800 text-slate-100'
        ) }
      >
        <div className="flex items-center gap-x-2 py-4">
          <Icon
            size={ 22 }
            className={ cn (
              'text-slate-500',
              isActive && 'text-slate-100',
              isCompleted && 'text-emerald-700'
            ) }
          />
          { label }
        </div>
        <div className={ cn (
          'ml-auto opacity-0 border-2 border-theme h-14 transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-emerald-700'
        ) }/>
      </button>
    )
  }
