import Link from 'next/link'
import { Logo } from '@/app/(dashbaord)/_components/Logo'
import { Course } from '.prisma/client'
import { Chapter } from '@prisma/client'
import { cn } from '@/lib/utils'
import { CourseSidebarItem } from '@/app/(course)/courses/[courseId]/_components/CourseSidebarItem'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter) []
  }
}

const CourseSidebar = ({course}: CourseSidebarProps) => {
  const isActive = true
  return (
    <div className={ 'h-full border-r flex-col overflow-y-auto shadow-sm' }>
      <div className={ 'p-6 flex flex-col border-b' }>
        <h1 className={"font-semibold"}>
          { course.title}
        </h1>
      </div>
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
