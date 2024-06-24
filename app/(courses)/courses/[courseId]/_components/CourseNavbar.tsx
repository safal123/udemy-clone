import { Chapter, Course, UserProgress } from '@prisma/client'
import { NavbarRoutes } from '@/components/shared/NavbarRoutes'
import { CourseMobileSidebar } from '@/app/(courses)/courses/[courseId]/_components/CourseMobileSidebar'

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    }) []
  },
}

export const CourseNavbar =
  ({course}: CourseNavbarProps) => {
    return (
      <div className="p-4 xl:hidden border-b h-full flex items-center shadow-sm">
        <CourseMobileSidebar
          course={ course }
        />
        <div className={ 'xl:hidden ml-auto' }>
          <NavbarRoutes/>
        </div>
      </div>
    )
  }
