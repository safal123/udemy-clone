import { Chapter, Course, UserProgress } from '@prisma/client'
import { NavbarRoutes } from '@/components/shared/NavbarRoutes'
import { CourseMobileSidebar } from '@/app/(course)/courses/[courseId]/_components/CourseMobileSidebar'

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter)[];
  };
}

export const CourseNavbar =
  ({course}: CourseNavbarProps) => {
    return (
      <div className="p-4 border-b h-full flex items-center shadow-sm">
        <CourseMobileSidebar
          course={ course }
        />
        <NavbarRoutes/>
      </div>
    )
  }
