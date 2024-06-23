'use client'

import { CheckCircle, LockOpen, PlayCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface CourseSidebarItemProps {
  label: string;
  chapterId: string;
  isCompleted: boolean;
  courseId: string;
  isFree: boolean;
  hasPurchase: boolean;
}

export const CourseSidebarItem =
  ({
     label,
     chapterId,
     isCompleted,
     courseId,
     isFree,
     hasPurchase
   }: CourseSidebarItemProps) => {
    const pathname = usePathname ()
    const router = useRouter ()

    const Icon = isCompleted ? CheckCircle : PlayCircle
    const isActive = pathname?.includes (chapterId)

    const onClick = () => {
      router.refresh ()
      router.push (`/courses/${ courseId }/chapters/${ chapterId }`)
    }

    return (
      <button
        onClick={ onClick }
        type="button"
        disabled={ !hasPurchase && !isFree }
        className={ cn (
          'w-full flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all',
          isActive && 'bg-slate-800 text-slate-100',
          !hasPurchase && !isFree && 'cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800'
        ) }
      >
        <div className="flex gap-x-2 py-4">
          <Icon
            size={ 22 }
            className={ cn (
              'text-slate-500',
              isActive && 'text-slate-100',
              isCompleted && 'text-green-500'
            ) }
          />
          { label }
          { isFree &&
            <span className={ 'text-xs text-slate-500 ml-auto' }>
              <LockOpen size={ 16 } className={ cn (
                'text-slate-500',
                isActive && 'text-slate-100',
                isCompleted && 'text-emerald-700'
              ) }/>
            </span>
          }
        </div>
        <div className={ cn (
          'ml-auto opacity-0 border-2 border-theme h-14 transition-all',
          isActive && 'opacity-100',
          isCompleted && 'border-emerald-700'
        ) }/>
      </button>
    )
  }
