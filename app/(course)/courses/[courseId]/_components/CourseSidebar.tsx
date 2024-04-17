import { Course } from '.prisma/client'
import { Chapter } from '@prisma/client'
import { CourseSidebarItem } from '@/app/(course)/courses/[courseId]/_components/CourseSidebarItem'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import CourseProgress from '@/components/shared/CourseProgress'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter) []
  }
}

const CourseSidebar = async ({course}: CourseSidebarProps) => {
  const isActive = true
  const {userId} = auth()
  if (!userId) return null
  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id
      }
    }
  })
  return (
    <div className={ 'h-full border-r flex-col overflow-y-auto shadow-sm' }>
      <div className={ 'p-6 flex flex-col border-b' }>
        <h1 className={ 'font-semibold' }>
          { course.title }
        </h1>
      </div>
      {purchase && <CourseProgress
        value={20}
        variant={100 > 0 ? 'success' : 'default'}
        size={'default'}
      />}
      <div className={ 'flex flex-col w-full' }>
        { course.chapters.map ((chapter) => (
          <CourseSidebarItem
            key={ chapter.id }
            label={ chapter.title }
            id={ chapter.id }
            isCompleted={ false }
            courseId={ course.id }
            isLocked={ chapter.isFree }
          />
        )) }
      </div>
    </div>
  )
}

export default CourseSidebar
