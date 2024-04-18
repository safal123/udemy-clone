'use server'

import { Course } from '.prisma/client'
import { Chapter, UserProgress } from '@prisma/client'
import { CourseSidebarItem } from '@/app/(courses)/courses/[courseId]/_components/CourseSidebarItem'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import CourseProgress from '@/components/shared/CourseProgress'
import { getUserProgress } from '@/actions/get-user-progress'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[]
    }) []
  },
}

const CourseSidebar = async ({course}: CourseSidebarProps) => {
  const {userId} = auth ()
  if (!userId) return null
  const purchase = await db.purchase.findUnique ({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id
      }
    }
  })

  const progress = await getUserProgress({ courseId: course.id, userId })

  return (
    <div className={ 'h-full border-r flex-col overflow-y-auto shadow-sm' }>
      <div className={ 'p-6 flex flex-col border-b' }>
        <h1 className={ 'font-semibold' }>
          { course.title }
        </h1>
      </div>
      { purchase && <CourseProgress
        value={ progress as number }
        variant={ 100 > 0 ? 'success' : 'default' }
        size={ 'default' }
      /> }
      <div className={ 'flex flex-col w-full' }>
        { course.chapters.map ((chapter) => (
          <CourseSidebarItem
            key={ chapter.id }
            label={ chapter.title }
            chapterId={ chapter.id }
            isCompleted={ !!chapter.userProgress[0]?.isCompleted }
            courseId={ course.id }
            isLocked={ chapter.isFree }
          />
        )) }
      </div>
    </div>
  )
}

export default CourseSidebar
