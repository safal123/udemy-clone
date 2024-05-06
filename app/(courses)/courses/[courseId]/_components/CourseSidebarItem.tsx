'use client'

import { CheckCircle, LockOpen, PlayCircle } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { getChapterIsCompleted } from '@/actions/get-chapter-is-completed'

interface CourseSidebarItemProps {
  label: string;
  chapterId: string;
  isCompleted: boolean;
  courseId: string;
  isFree: boolean;
  progress?: number
}

export const CourseSidebarItem =
  ({
     label,
     chapterId,
     isCompleted,
     courseId,
     isFree,
     progress
   }: CourseSidebarItemProps) => {
    const pathname = usePathname ()
    const router = useRouter ()
    const [chapterIsCompleted, setChapterIsCompleted] = useState (false)
    const {user} = useUser ()

    useEffect (() => {
      const isChapterCompleted = async () => {
        if (!user?.id) return
        const result = await getChapterIsCompleted ({
          courseId,
          userId: user?.id,
          chapterId
        })
        setChapterIsCompleted (result as boolean)
      }

      isChapterCompleted ()
    }, [chapterId, courseId, progress, user?.id])

    const Icon = isCompleted ? CheckCircle : PlayCircle
    const isActive = pathname?.includes (chapterId)

    const onClick = () => {
      router.refresh()
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
              chapterIsCompleted && 'text-primary'
            ) }
          />
          { label }
          { isFree &&
            <span className={ 'text-xs text-slate-500 ml-auto' }>
              <LockOpen size={ 16 } className={ cn (
                'text-slate-500',
                isActive && 'text-slate-100',
                chapterIsCompleted && 'text-emerald-700'
              ) }/>
            </span>
          }
        </div>
        <div className={ cn (
          'ml-auto opacity-0 border-2 border-theme h-14 transition-all',
          isActive && 'opacity-100',
          chapterIsCompleted && 'border-emerald-700'
        ) }/>
      </button>
    )
  }
