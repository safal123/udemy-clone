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
      userProgress?: UserProgress[] | null
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

  const progress = await getUserProgress ({courseId: course.id, userId})

  return (
    <div className={ 'h-full border-r flex-col overflow-y-auto shadow-sm bg-background' }>
      <div className={ 'h-[73px] flex flex-col border-b items-center justify-center' }>
        <h1 className={ 'font-semibold' }>
          { course.title }
        </h1>
      </div>
      { purchase &&
        <CourseProgress
          value={ progress as number }
          variant={ 100 > 0 ? 'success' : 'default' }
          size={ 'default' }
        />
      }
      <div className={ 'flex flex-col w-full' }>
        { course.chapters.map ((chapter) => (
          <div key={ chapter.id }>
            <CourseSidebarItem
              hasPurchase={ !!purchase }
              key={ chapter.id }
              label={ chapter.title }
              chapterId={ chapter.id }
              isCompleted={ chapter.userProgress ? chapter.userProgress[0]?.isCompleted : false }
              courseId={ course.id }
              isFree={ chapter.isFree }
            />
          </div>
        )) }
      </div>
    </div>
  )
}

export default CourseSidebar
